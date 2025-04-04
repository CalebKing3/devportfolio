import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command } from 'lucide-react';

const UniversalSearchTooltip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('hasSeenSearchTooltip');
    if (hasSeenTooltip) {
      setIsVisible(false);
      setHasBeenShown(true);
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('hasSeenSearchTooltip', 'true');
      setHasBeenShown(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (hasBeenShown) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-24 right-8 bg-secondary-bg rounded-lg shadow-lg p-4 max-w-sm z-50 border border-border-color"
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-editor-bg rounded-lg">
              <Command size={20} className="text-accent-blue" />
            </div>
            <div>
              <h3 className="font-medium text-editor-text mb-1">Quick Tip</h3>
              <p className="text-sm text-editor-text opacity-80">
                Press <kbd className="px-2 py-1 bg-editor-bg rounded text-xs font-mono">Shift</kbd> twice to open universal search and explore content across all pages.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UniversalSearchTooltip;