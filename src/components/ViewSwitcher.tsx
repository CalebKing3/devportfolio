import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, GitCommit, GitPullRequest, Layers } from 'lucide-react';

interface ViewSwitcherProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isSidebarOpen: boolean;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, onViewChange, isSidebarOpen }) => {
  const views = [
    { id: 'project', icon: <FolderOpen size={20} />, label: 'Project' },
    { id: 'commits', icon: <GitCommit size={20} />, label: 'Commits' },
    { id: 'merge-requests', icon: <GitPullRequest size={20} />, label: 'Merge Requests' },
    { id: 'structure', icon: <Layers size={20} />, label: 'Structure' },
  ];

  return (
    <div className="flex flex-col space-y-2 p-2">
      {views.map((view) => (
        <motion.button
          key={view.id}
          onClick={() => onViewChange(view.id)}
          className={`flex items-center p-2 rounded-lg transition-colors ${
            currentView === view.id 
              ? 'bg-selection-bg text-accent-blue' 
              : 'text-editor-text hover:bg-active-tab'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {view.icon}
          {isSidebarOpen && <span className="ml-2">{view.label}</span>}
        </motion.button>
      ))}
    </div>
  );
};

export default ViewSwitcher;