import React from 'react';
import { Keyboard } from 'lucide-react';


const Shortcuts: React.FC = () => {
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
    <div className="h-full overflow-auto p-4 bg-panel-bg rounded">
      <div className="space-y-8">
        {shortcuts.map((category) => (
          <div
            key={category.category}
            className="space-y-2">
            <h3 className="text-editor-text font-medium text-sm flex items-center px-3 py-1">
              <Keyboard size={14} className="mr-2 text-gray-400" />
              {category.category}
            </h3>
              <div className="space-y-1">
              {category.items.map((shortcut, itemIndex) => (
                <div
                  key={itemIndex} 
                  className="flex items-center justify-between py-1 px-3 rounded group hover:bg-hover-bg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                  
                    <div className="flex items-center space-x-1">

                      {Array.isArray(shortcut.keys) ? (
                        shortcut.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            <kbd className="px-2 py-1 bg-editor-bg rounded text-xs font-mono border border-border-color shadow-sm">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && <span>+</span>}
                          </React.Fragment>
                        ))
                      ) : (
                        <code className="px-2 py-1 bg-editor-bg rounded text-xs font-mono text-accent-green shadow-sm">
                          {shortcut.keys}
                        </code>
                      )}
                    </div> 
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {shortcut.description}
                  </span>
                  </div>
              ))}
            </div>
          </div>
        ))}
          </div>
    </div>
  );
};

export default Shortcuts;