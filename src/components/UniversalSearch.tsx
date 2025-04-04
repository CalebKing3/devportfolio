import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, File, User, FolderGit2, FileText, Mail, X, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const UniversalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchResults: SearchResult[] = [
    {
      title: 'Home',
      description: 'Landing page with personal introduction',
      icon: <File size={16} />,
      path: '/'
    },
    {
      title: 'About',
      description: 'Learn more about my background and skills',
      icon: <User size={16} />,
      path: '/about'
    },
    {
      title: 'Projects',
      description: 'View my portfolio of projects',
      icon: <FolderGit2 size={16} />,
      path: '/projects'
    },
    {
      title: 'Articles',
      description: 'Read my technical blog posts',
      icon: <FileText size={16} />,
      path: '/articles'
    },
    {
      title: 'Contact',
      description: 'Get in touch with me',
      icon: <Mail size={16} />,
      path: '/contact'
    }
  ];

  const filteredResults = searchResults.filter(
    result => 
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with double Shift
      if (e.key === 'Shift') {
        const now = Date.now();
        if (now - (window as any).lastShiftPress < 500) {
          setIsOpen(true);
          e.preventDefault();
        }
        (window as any).lastShiftPress = now;
      }

      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      navigate(filteredResults[selectedIndex].path);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh] z-50"
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl bg-editor-bg rounded-lg shadow-lg overflow-hidden border border-border-color"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="bg-secondary-bg border-b border-border-color p-2">
          <div className="flex items-center">
            <Command size={16} className="text-accent-blue mr-2" />
            <span className="text-sm text-editor-text">Search</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center p-4 border-b border-border-color">
          <Search size={20} className="text-editor-text opacity-50 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-editor-text placeholder-editor-text/50"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-active-tab rounded transition-colors"
          >
            <X size={20} className="text-editor-text opacity-50" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-auto">
          {filteredResults.length > 0 ? (
            <div className="py-2">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`px-4 py-3 cursor-pointer flex items-start space-x-3 ${
                    selectedIndex === index ? 'bg-selection-bg' : 'hover:bg-active-tab'
                  }`}
                  onClick={() => {
                    navigate(result.path);
                    setIsOpen(false);
                  }}
                >
                  <div className={`mt-1 ${selectedIndex === index ? 'text-accent-blue' : 'text-editor-text'}`}>
                    {result.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      selectedIndex === index ? 'text-accent-blue' : 'text-editor-text'
                    }`}>
                      {result.title}
                    </h3>
                    <p className="text-sm text-editor-text opacity-70">
                      {result.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-editor-text opacity-70">
              No results found for "{searchTerm}"
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="bg-secondary-bg border-t border-border-color p-2">
          <div className="flex items-center justify-between text-xs text-editor-text opacity-70">
            <div className="flex items-center space-x-4">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span>esc to close</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UniversalSearch;