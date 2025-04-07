import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Loader2, Youtube, AlertTriangle } from 'lucide-react';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

// YouTube API configuration
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const DEFAULT_CHANNEL_URL = 'https://www.youtube.com/channel/UCDr8B1HszSnuJrCnxj5MHLw'; // Caleb's channel
const MAX_RESULTS = 12;

const YouTube = () => {
  const [channelUrl, setChannelUrl] = useState<string>(DEFAULT_CHANNEL_URL);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [channelInfo, setChannelInfo] = useState<{ title: string; thumbnail: string } | null>(null);

  // Load videos from default channel on initial render
  useEffect(() => {
    if (channelUrl === DEFAULT_CHANNEL_URL) {
      fetchYouTubeVideos();
    }
  }, []);

  const extractChannelId = (url: string): string | null => {
    // Handle different YouTube URL formats
    const patterns = [
      /youtube\.com\/channel\/([^\/\?]+)/i,
      /youtube\.com\/c\/([^\/\?]+)/i,
      /youtube\.com\/user\/([^\/\?]+)/i,
      /youtube\.com\/@([^\/\?]+)/i
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // If no pattern matches, return the URL as is (might be just the channel ID)
    return url.trim();
  };

  const fetchYouTubeVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const channelId = extractChannelId(channelUrl);
      
      if (!channelId) {
        throw new Error('Invalid YouTube channel URL');
      }

      let videos: YouTubeVideo[] = [];
      let channelTitle = '';
      let channelThumbnail = '';

      if (YOUTUBE_API_KEY) {
        // Use actual YouTube Data API if key is provided
        try {
          // First get channel details
          let channelResponse;
          if (channelUrl.includes('@')) {
            // Handle @username channels
            const handleResponse = await axios.get(
              `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${channelId}&type=channel&key=${YOUTUBE_API_KEY}`
            );
            const actualChannelId = handleResponse.data.items[0]?.id?.channelId;
            if (actualChannelId) {
              channelResponse = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${actualChannelId}&key=${YOUTUBE_API_KEY}`
              );
            }
          } else {
            // Direct channel ID
            channelResponse = await axios.get(
              `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
            );
          }

          const channelData = channelResponse?.data?.items[0];
          if (channelData) {
            channelTitle = channelData.snippet.title;
            channelThumbnail = channelData.snippet.thumbnails.default.url;
          
            // Now get videos from the channel
            const videosResponse = await axios.get(
              `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelData.id}&maxResults=${MAX_RESULTS}&order=date&type=video&key=${YOUTUBE_API_KEY}`
            );
            
            videos = videosResponse.data.items.map((item: any) => ({
              id: item.id.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.medium.url, 
              channelTitle: channelTitle,
              publishedAt: item.snippet.publishedAt
            }));
          }
        } catch (apiError) {
          console.error('YouTube API error:', apiError);
          throw new Error('Failed to fetch data from YouTube API. Falling back to mock data.');
        }
      }

      // If no videos were fetched (no API key or API error), use mock data
      if (videos.length === 0) {
        console.warn('Using mock YouTube data');
        videos = Array.from({ length: MAX_RESULTS }, (_, i) => ({
          id: `video-${i}`,
          title: `Example YouTube Video ${i + 1} - ${channelId}`,
          thumbnail: `https://picsum.photos/id/${30 + i}/320/180`,
          channelTitle: channelTitle || 'Channel ' + channelId,
          publishedAt: new Date(Date.now() - i * 86400000).toISOString()
        }));

        channelTitle = channelTitle || 'Channel ' + channelId;
        channelThumbnail = channelThumbnail || `https://picsum.photos/id/20/100/100`;
      }

      setChannelInfo({
        title: channelTitle,
        thumbnail: channelThumbnail
      });
      
      setVideos(videos);
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError('Failed to fetch YouTube videos. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (channelUrl.trim()) {
      fetchYouTubeVideos();
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-editor-bg">
      {/* Header */}
      <div className="border-b border-border-color bg-secondary-bg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-editor-text flex items-center">
            <Youtube className="mr-2" size={24} />
            YouTube Channel Viewer
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Form */}
        <div className="bg-secondary-bg rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="channelUrl" className="block text-sm font-medium text-editor-comment mb-2">
                Enter YouTube Channel URL
              </label>
              <div className="relative">
                <input
                  id="channelUrl"
                  type="text"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  placeholder={DEFAULT_CHANNEL_URL}
                  className="w-full bg-editor-bg border border-border-color rounded-lg py-2 pl-10 pr-4 text-editor-text focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-editor-comment" />
                </div>
              </div>
              <p className="mt-2 text-xs text-editor-comment">
                Supports channel URLs like youtube.com/channel/ID, youtube.com/c/NAME, or youtube.com/@handle
              </p>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || !channelUrl.trim()}
                className="bg-accent-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Loading...
                  </>
                ) : (
                  'Load Videos'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 flex items-start"
          >
            <AlertTriangle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Channel Info */}
        {channelInfo && (
          <div className="flex items-center mb-6 bg-secondary-bg p-4 rounded-lg">
            <img
              src={channelInfo.thumbnail}
              alt={channelInfo.title}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold text-editor-text">{channelInfo.title}</h2>
              <p className="text-editor-comment text-sm">{videos.length} videos</p>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        {videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-secondary-bg rounded-lg overflow-hidden shadow-lg"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <Youtube className="opacity-0 hover:opacity-100 text-white" size={48} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-editor-text line-clamp-2 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-editor-comment">{formatDate(video.publishedAt)}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-editor-comment">
            <Youtube size={64} className="mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No videos to display</h3>
            <p className="text-center max-w-md">
              Enter a YouTube channel URL above to start browsing videos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTube;