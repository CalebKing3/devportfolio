import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Bookmark } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { Post } from '../types';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

const ArticleView: React.FC<{ post: Post }> = ({ post }) => {
  const navigate = useNavigate();
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Extract headings from content for table of contents
    const headings = post.content.match(/#{1,3} .+/g) || [];
    const toc = headings.map((heading) => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const title = heading.replace(/^#+\s/, '');
      const id = title.toLowerCase().replace(/[^\w]+/g, '-');
      return { id, title, level };
    });
    setTableOfContents(toc);
  }, [post.content]);

  useEffect(() => {
    // Intersection Observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  const renderers = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomOneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '1.5rem 0',
            borderRadius: '0.5rem',
            background: 'var(--editor-bg)',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    // Add custom heading renderer to include IDs for navigation
    h1: ({ children }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <h1 id={id} className="text-4xl font-bold mb-6 text-accent-blue">{children}</h1>;
    },
    h2: ({ children }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <h2 id={id} className="text-3xl font-bold mt-12 mb-4 text-accent-purple">{children}</h2>;
    },
    h3: ({ children }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return <h3 id={id} className="text-2xl font-bold mt-8 mb-4">{children}</h3>;
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-6 py-8"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/articles')}
        className="flex items-center text-editor-text hover:text-accent-blue mb-8"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Articles
      </button>

      {/* Article Header */}
      <div className="border-b border-border-color pb-8 mb-8">
        <h1 className="text-4xl font-bold text-accent-blue mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-editor-text mb-6">
          <span className="flex items-center">
            <User size={16} className="mr-2" />
            {post.author}
          </span>
          <span className="flex items-center">
            <Calendar size={16} className="mr-2" />
            {format(new Date(post.date), 'MMMM dd, yyyy')}
          </span>
          <span className="flex items-center">
            <Clock size={16} className="mr-2" />
            {post.readingTime}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="flex items-center px-3 py-1 bg-editor-bg rounded-full text-sm text-accent-green"
            >
              <Tag size={14} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Table of Contents (Desktop) */}
        {tableOfContents.length > 0 && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h4 className="text-lg font-bold mb-4 text-accent-purple">Table of Contents</h4>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm hover:text-accent-blue transition-colors ${
                      activeSection === item.id ? 'text-accent-blue' : 'text-editor-text'
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="flex-1 max-w-none prose prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={renderers}
            className="markdown-content"
          >
            {post.content}
          </ReactMarkdown>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-border-color">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button className="flex items-center text-editor-text hover:text-accent-blue">
                  <Share2 size={20} className="mr-2" />
                  Share
                </button>
                <button className="flex items-center text-editor-text hover:text-accent-blue">
                  <Bookmark size={20} className="mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default ArticleView;