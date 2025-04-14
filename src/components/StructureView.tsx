import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Code,
  Folder,
  FileJson,
  Package,
  Coffee,
  FileType,
} from 'lucide-react';

interface StructureItem {
  type: string;
  name: string;
  items?: StructureItem[];
  isOpen?: boolean;
}

const StructureView: React.FC<{ isSidebarOpen: boolean }> = ({
  isSidebarOpen,
}) => {
  const [structure, setStructure] = useState<StructureItem[]>([
    { type: 'folder', name: 'src', isOpen: true, items: [
      { type: 'component', name: 'App.tsx' },
      { type: 'component', name: 'Layout.tsx' },
      { type: 'file', name: 'index.css' },
      { type: 'folder', name: 'components', isOpen: true, items: [
        { type: 'component', name: 'StructureView.tsx' },
      ] },
      { type: 'file', name: 'main.tsx' },
    ] },
    { type: 'file', name: 'package.json' },
  ]);

  const getIcon = (item: StructureItem) => {
    if (item.type === 'folder') {
      return item.isOpen ? (
        <Folder size={16} className="text-accent-blue" />
      ) : (
        <Folder size={16} className="text-editor-text" />
      );
    } else {
      switch (item.name.split('.').pop()) {
        case 'tsx':
        case 'jsx':
          return <Code size={16} className="text-accent-purple" />;
        case 'json':
          return <FileJson size={16} className="text-accent-green" />;
        case 'js':
          return <Coffee size={16} className="text-accent-blue" />;
        case 'css':
          return <Package size={16} className="text-accent-blue" />;
        case 'ts':
          return <Code size={16} className="text-accent-blue" />;
        default:
          return <FileType size={16} className="text-accent-gray" />;
      }
    }
  };

  const toggleFolder = (item: StructureItem) => {
    setStructure(
      structure.map((i) =>
        i.name === item.name ? { ...i, isOpen: !i.isOpen } : i
      )
    );
  };

  return (
    <div className="p-2 space-y-2 overflow-y-auto h-full">
      {structure.map((item: StructureItem) => (
        <motion.div
          key={item.name}
          className="space-y-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center p-1 rounded transition-colors cursor-pointer hover:bg-active-tab" onClick={() => item.type === 'folder' && toggleFolder(item)}>
            {getIcon(item)}
            {isSidebarOpen && (
              <>
                <span className="ml-2 text-editor-text">{item.name}</span>
                <ChevronRight size={16} className="ml-auto" />
              </>
            )}
          </div>
          {isSidebarOpen && item.type === 'folder' && item.isOpen && item.items && (
            <AnimatePresence>
              <motion.div
                className="ml-4 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.items.map((subItem) => (
                  <div
                    key={subItem.name}
                    className="flex items-center p-1 rounded hover:bg-active-tab transition-colors cursor-pointer"
                  >
                    {getIcon(subItem)}
                    <span className="ml-2 text-editor-text">{subItem.name}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default StructureView;