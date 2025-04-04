import React from 'react';
import { motion } from 'framer-motion';
import { Component, FunctionSquare as Function, Variable, ChevronRight } from 'lucide-react';

const StructureView: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const structure = [
    {
      type: 'component',
      name: 'App',
      items: ['useState', 'useEffect', 'render'],
    },
    {
      type: 'component',
      name: 'Layout',
      items: ['handleToggle', 'renderContent', 'render'],
    },
    {
      type: 'function',
      name: 'utils',
      items: ['formatDate', 'validateInput', 'parseData'],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'component':
        return <Component size={16} className="text-accent-purple" />;
      case 'function':
        return <Function size={16} className="text-accent-blue" />;
      default:
        return <Variable size={16} className="text-accent-green" />;
    }
  };

  return (
    <div className="p-2 space-y-2">
      {structure.map((item) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <div className="flex items-center p-2 rounded hover:bg-active-tab transition-colors cursor-pointer">
            {getIcon(item.type)}
            {isSidebarOpen && (
              <>
                <span className="ml-2 text-editor-text">{item.name}</span>
                <ChevronRight size={16} className="ml-auto" />
              </>
            )}
          </div>
          {isSidebarOpen && (
            <div className="ml-6 space-y-1">
              {item.items.map((subItem) => (
                <div
                  key={subItem}
                  className="flex items-center p-2 rounded hover:bg-active-tab transition-colors cursor-pointer"
                >
                  <Variable size={14} className="text-accent-green" />
                  <span className="ml-2 text-editor-text opacity-70">{subItem}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default StructureView;