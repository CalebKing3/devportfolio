import React from 'react';
import { Folder, FileType, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileTreeItem {
  type: 'folder' | 'file';
  icon: React.ReactNode;
  children?: Record<string, FileTreeItem>;
}

interface ProjectViewProps {
  fileTree: Record<string, FileTreeItem>;
  expandedFolders: Set<string>;
  toggleFolder: (path: string) => void;
  isSidebarOpen: boolean;
}

const ProjectView: React.FC<ProjectViewProps> = ({ 
  fileTree, 
  expandedFolders, 
  toggleFolder,
  isSidebarOpen 
}) => {
  const renderFileTree = (tree: Record<string, FileTreeItem>, path = '') => {
    return Object.entries(tree).map(([name, item]) => {
      const currentPath = path ? `${path}/${name}` : name;
      const isExpanded = expandedFolders.has(currentPath);
      
      if (item.type === 'folder') {
        return (
          <div key={currentPath}>
            <div 
              className="file-tree-item flex items-center"
              onClick={() => toggleFolder(currentPath)}
              style={{ paddingLeft: isSidebarOpen ? `${path.split('/').length * 1}rem` : '0.5rem' }}
            >
              <span className={isSidebarOpen ? '' : 'mx-auto'}>{item.icon}</span>
              {isSidebarOpen && <span className="ml-2 truncate">{name}</span>}
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="folder-content"
                >
                  {item.children && renderFileTree(item.children, currentPath)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }

      return (
        <div
          key={currentPath}
          className="file-tree-item flex items-center"
          style={{ paddingLeft: isSidebarOpen ? `${(path.split('/').length + 1) * 1}rem` : '0.5rem' }}
        >
          <span className={isSidebarOpen ? '' : 'mx-auto'}>{item.icon}</span>
          {isSidebarOpen && <span className="ml-2 truncate">{name}</span>}
        </div>
      );
    });
  };

  return (
    <div className="file-tree p-2">
      {renderFileTree(fileTree)}
    </div>
  );
};

export default ProjectView;