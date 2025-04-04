import React from 'react';
import { motion } from 'framer-motion';
import { Keyboard, Search, Terminal as TerminalIcon, Command, ChevronRight } from 'lucide-react';

const Shortcuts: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['Shift', 'Shift'], description: 'Search Everywhere' },
        { keys: ['Ctrl', '`'], description: 'Toggle Terminal' },
        { keys: ['Ctrl', 'B'], description: 'Toggle Sidebar' },
        { keys: ['Alt', '1'], description: 'Focus Project View' },
        { keys: ['Alt', '2'], description: 'Focus Commits View' },
      ]
    },
    {
      category: 'Terminal',
      items: [
        { keys: ['Tab'], description: 'Autocomplete Command' },
        { keys: ['↑'], description: 'Previous Command' },
        { keys: ['↓'], description: 'Next Command' },
        { keys: ['Ctrl', 'C'], description: 'Cancel Command' },
        { keys: ['clear'], description: 'Clear Terminal' },
      ]
    },
    {
      category: 'Quick Commands',
      items: [
        { keys: ['help'], description: 'Show Available Commands' },
        { keys: ['about'], description: 'View Profile Information' },
        { keys: ['projects'], description: 'List All Projects' },
        { keys: ['contact'], description: 'Show Contact Details' },
        { keys: ['skills'], description: 'List Technical Skills' },
      ]
    },
    {
      category: 'Views',
      items: [
        { keys: ['Alt', 'P'], description: 'Projects View' },
        { keys: ['Alt', 'A'], description: 'Articles View' },
        { keys: ['Alt', 'C'], description: 'Contact View' },
        { keys: ['Alt', 'R'], description: 'Resume View' },
      ]
    }
  ];

  return (
    <div className="h-full overflow-auto p-4">
      <div className="space-y-6">
        {shortcuts.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-accent-purple font-medium mb-3 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.items.map((shortcut, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-active-tab group"
                >
                  <div className="flex items-center space-x-2 text-editor-text">
                    <div className="flex items-center space-x-1">
                      {Array.isArray(shortcut.keys) ? (
                        shortcut.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            <kbd className="px-2 py-1 bg-editor-bg rounded text-xs font-mono border border-border-color">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && <span>+</span>}
                          </React.Fragment>
                        ))
                      ) : (
                        <code className="px-2 py-1 bg-editor-bg rounded text-xs font-mono text-accent-green">
                          {shortcut.keys}
                        </code>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-editor-text opacity-70 group-hover:opacity-100">
                    {shortcut.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Shortcuts;