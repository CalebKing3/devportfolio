import React, { useRef, useEffect, useState } from 'react';
import { MessageSquare, RefreshCw } from 'lucide-react';

interface ChatbaseEmbedProps {
  chatbotId?: string;
}

const ChatbaseEmbed: React.FC<ChatbaseEmbedProps> = ({ 
  chatbotId = "NjmKkpFKQfjhTkh0wzNKt" 
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [height, setHeight] = useState('100%');
  
  // Handle iframe load events
  const handleIframeLoad = () => {
    setLoading(false);
    
    // Apply custom styles to the iframe content to match your theme
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const iframeDocument = iframeRef.current.contentWindow.document;
        
        // Create and inject a style tag into the iframe
        const styleTag = iframeDocument.createElement('style');
        styleTag.textContent = `
          body, html {
            background-color: var(--editor-bg, #1e1e1e) !important;
            color: var(--editor-text, #d4d4d4) !important;
          }
          .chatbase-bubble-container {
            background-color: var(--secondary-bg, #252526) !important;
          }
          /* More specific overrides for Chatbase elements */
          .chatbase-bubble, .chatbase-chat-input {
            background-color: var(--secondary-bg, #252526) !important;
            color: var(--editor-text, #d4d4d4) !important;
            border-color: var(--border-color, #3c3c3c) !important;
          }
          .chatbase-icon-button {
            background-color: var(--active-tab, #2d2d2d) !important;
            color: var(--editor-text, #d4d4d4) !important;
          }
          :root {
            color-scheme: dark;
          }
        `;
        
        iframeDocument.head.appendChild(styleTag);
      }
    } catch (e) {
      console.error("Failed to inject styles into iframe:", e);
    }
  };

  const handleIframeError = () => {
    setError(true);
    setLoading(false);
  };

  // Function to reload the iframe
  const reloadIframe = () => {
    setLoading(true);
    setError(false);
    
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = src;
        }
      }, 100);
    }
  };

  // Make sure the iframe resizes properly
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const availableHeight = containerRef.current.clientHeight;
        setHeight(`${availableHeight}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-editor-bg text-editor-text" ref={containerRef}>
      {/* Header */}
      <div className="bg-secondary-bg border-b border-border-color p-2 flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare size={16} className="text-accent-green mr-2" />
          <h2 className="font-medium">Chatbase Assistant</h2>
        </div>
        <button 
          onClick={reloadIframe}
          className="p-1.5 hover:bg-active-tab rounded-sm transition-colors text-editor-text"
          title="Reload Chatbot"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      
      {/* Iframe Container */}
      <div className="flex-grow relative bg-editor-bg">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-editor-bg z-10">
            <div className="flex flex-col items-center">
              <RefreshCw size={24} className="animate-spin mb-2 text-accent-green" />
              <p>Loading Chatbase...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-editor-bg z-10">
            <div className="flex flex-col items-center text-center p-4">
              <p className="mb-2">Could not load Chatbase. Please check your internet connection.</p>
              <button 
                onClick={reloadIframe}
                className="px-3 py-1.5 bg-active-tab rounded text-sm hover:bg-selection-bg flex items-center"
              >
                <RefreshCw size={14} className="mr-2" /> Retry
              </button>
            </div>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          src={`https://www.chatbase.co/chatbot-iframe/${chatbotId}`}
          width="100%"
          height={height}
          style={{ 
            border: 'none',
            background: 'transparent',
            display: error ? 'none' : 'block',
            overflow: 'hidden'
          }}
          title="Chatbase Assistant"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          frameBorder="0"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ChatbaseEmbed;