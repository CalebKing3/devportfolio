import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, User, Calendar } from 'lucide-react';

const CommitsView: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const commits = [
    {
      hash: 'a1b2c3d',
      message: 'Update authentication flow',
      author: 'John Doe',
      date: '2024-03-15',
    },
    {
      hash: 'e4f5g6h',
      message: 'Fix responsive layout issues',
      author: 'Jane Smith',
      date: '2024-03-14',
    },
    {
      hash: 'i7j8k9l',
      message: 'Add new API endpoints',
      author: 'Bob Johnson',
      date: '2024-03-13',
    },
  ];

  return (
    <div className="p-2 space-y-2">
      {commits.map((commit) => (
        <motion.div
          key={commit.hash}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-editor-bg p-3 rounded-lg hover:bg-active-tab transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2 text-accent-purple">
            <GitCommit size={16} />
            <span className="font-mono text-sm">{commit.hash}</span>
          </div>
          {isSidebarOpen && (
            <>
              <p className="text-editor-text mt-2">{commit.message}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-editor-text opacity-70">
                <div className="flex items-center">
                  <User size={14} className="mr-1" />
                  {commit.author}
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {commit.date}
                </div>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default CommitsView;