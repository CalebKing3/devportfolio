import React, { useState } from 'react';
import { Eye, Code, Copy, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from '../hooks/useTheme';

interface MarkdownPreviewProps {
  content: string;
  title?: string;
  githubUrl?: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, title, githubUrl }) => {
  const [viewMode, setViewMode] = useState<'markdown' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderers = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={theme === 'dark' ? atomOneDark : github}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '1.5rem 0',
            borderRadius: '0.5rem',
            background: 'var(--secondary-bg)',
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
  };

  return (
    <div className="min-h-screen bg-editor-bg">
      {/* Header */}
      <div className="border-b border-border-color bg-secondary-bg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {title && (
              <h1 className="text-xl font-semibold text-editor-text">{title}</h1>
            )}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-selection-bg text-accent-blue'
                      : 'text-editor-text hover:bg-active-tab'
                  }`}
                >
                  <Eye size={16} className="mr-2" />
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('markdown')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'markdown'
                      ? 'bg-selection-bg text-accent-blue'
                      : 'text-editor-text hover:bg-active-tab'
                  }`}
                >
                  <Code size={16} className="mr-2" />
                  Markdown
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-3 py-1 rounded hover:bg-active-tab transition-colors text-editor-text"
                >
                  {copied ? (
                    <span className="text-accent-green">Copied!</span>
                  ) : (
                    <>
                      <Copy size={16} className="mr-2" />
                      Copy
                    </>
                  )}
                </button>
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-1 rounded hover:bg-active-tab transition-colors text-editor-text"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Open in GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {viewMode === 'markdown' ? (
          <div className="font-mono bg-secondary-bg rounded-lg p-6 text-editor-text whitespace-pre-wrap">
            {content}
          </div>
        ) : (
          <div className={`prose ${theme === 'light' ? 'prose-light' : 'prose-invert'} max-w-none`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={renderers}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownPreview;