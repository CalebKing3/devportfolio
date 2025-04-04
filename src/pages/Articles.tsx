import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Tag, Calendar, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import type { Post } from '../types';
import ArticleView from '../components/ArticleView';

const Articles = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      // This would normally fetch from your markdown files
      const samplePosts: Post[] = [
        {
          slug: 'getting-started-with-react',
          title: 'Getting Started with React: A Comprehensive Guide',
          date: '2024-03-15',
          author: 'John Doe',
          tags: ['React', 'JavaScript', 'Web Development'],
          excerpt: 'Learn the fundamentals of React and start building modern web applications...',
          content: `
# Getting Started with React: A Comprehensive Guide

React is a powerful JavaScript library for building user interfaces. In this guide, we'll cover the essential concepts and best practices.

## Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Node.js installed on your machine
- A code editor of your choice

## Installation

First, create a new React project using Vite:

\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
\`\`\`

## Components

React components are the building blocks of any React application. Here's a simple component:

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

## State Management

React provides the useState hook for managing component state:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`
`,
          readingTime: '5 min read'
        },
        {
          slug: 'typescript-best-practices',
          title: 'TypeScript Best Practices for 2024',
          date: '2024-03-14',
          author: 'Jane Smith',
          tags: ['TypeScript', 'JavaScript', 'Programming'],
          excerpt: 'Discover the latest TypeScript best practices and patterns...',
          content: '# TypeScript Best Practices\n\nFull content here...',
          readingTime: '8 min read'
        },
      ];

      setPosts(samplePosts);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  if (selectedPost) {
    return <ArticleView post={selectedPost} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key="article-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="border-b border-border-color pb-6">
            <h1 className="text-4xl font-bold text-accent-blue mb-4"># Technical Blog</h1>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-editor-text" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary-bg border border-border-color rounded-lg text-editor-text focus:outline-none focus:border-accent-blue"
                />
              </div>
              <div className="flex-shrink-0">
                <select
                  value={selectedTag || ''}
                  onChange={(e) => setSelectedTag(e.target.value || null)}
                  className="w-full sm:w-auto px-4 py-2 bg-secondary-bg border border-border-color rounded-lg text-editor-text focus:outline-none focus:border-accent-blue"
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPosts.map((post) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary-bg rounded-lg overflow-hidden cursor-pointer hover:bg-active-tab transition-colors"
                onClick={() => setSelectedPost(post)}
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-accent-blue mb-2">
                    {post.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className="flex items-center px-2 py-1 bg-editor-bg rounded text-sm text-accent-green hover:bg-active-tab"
                      >
                        <Tag size={14} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-editor-text mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-editor-text space-x-4">
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {format(new Date(post.date), 'MMM dd, yyyy')}
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          {filteredPosts.length > postsPerPage && (
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-secondary-bg rounded-lg text-editor-text disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="flex items-center px-4 bg-secondary-bg rounded-lg text-editor-text">
                Page {currentPage} of {Math.ceil(filteredPosts.length / postsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPosts.length / postsPerPage)))}
                disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                className="p-2 bg-secondary-bg rounded-lg text-editor-text disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Articles;