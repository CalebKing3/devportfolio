import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Eye, Code, FileText } from 'lucide-react';

interface BlogEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
  initialContent?: string;
}
const MonacoEditor = lazy(() => import('@monaco-editor/react'));

// Lazy load the MarkdownPreview component
const MarkdownPreview = lazy(() => import('./MarkdownPreview'));

const BlogEditor: React.FC<BlogEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  initialContent = ''
}) => {
  const [content, setContent] = useState(initialContent);
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
    const handleContentChange = (
      value: string | undefined,
    ) => {
      setContent(value || '');
    };
  const handleSave = () => {
    onSave(content);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-editor-bg rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-secondary-bg border-b border-border-color p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText size={20} className="text-accent-blue" />
            <h2 className="text-lg font-medium text-editor-text">Blog Editor</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('edit')}
              className={`p-2 rounded ${
                viewMode === 'edit' ? 'bg-selection-bg text-accent-blue' : 'text-editor-text hover:bg-active-tab'
              }`}
            >
              <Code size={20} />
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`p-2 rounded ${
                viewMode === 'preview' ? 'bg-selection-bg text-accent-blue' : 'text-editor-text hover:bg-active-tab'
              }`}
            >
              <Eye size={20} />
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-accent-blue text-white rounded hover:bg-blue-600 transition-colors flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-active-tab rounded transition-colors"
            >
              <X size={20} className="text-editor-text" />
            </button>
          </div>
        </div>

        {/* Editor/Preview */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'edit' ? (
            <Suspense
              fallback={<div className="w-full h-full p-4 text-editor-text bg-editor-bg outline-none">Loading editor...</div>}
            >
              <MonacoEditor
                theme="vs-dark"
                height="100%"
                language="markdown"
                value={content}
                onChange={handleContentChange}
              />
            </Suspense>
          ) : (
            <Suspense
              fallback={<div className="w-full h-full p-4 text-editor-text bg-editor-bg">Loading preview...</div>}
            >
              <MarkdownPreview className="h-full overflow-auto" content={content} />
            </Suspense>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogEditor;