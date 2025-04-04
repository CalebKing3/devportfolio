import React from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, User, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const MergeRequestsView: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const mergeRequests = [
    {
      id: 'MR-123',
      title: 'Feature: User Authentication',
      author: 'John Doe',
      date: '2024-03-15',
      status: 'open',
    },
    {
      id: 'MR-122',
      title: 'Fix: Database Migration',
      author: 'Jane Smith',
      date: '2024-03-14',
      status: 'merged',
    },
    {
      id: 'MR-121',
      title: 'Update: API Documentation',
      author: 'Bob Johnson',
      date: '2024-03-13',
      status: 'closed',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock size={16} className="text-accent-blue" />;
      case 'merged':
        return <CheckCircle size={16} className="text-accent-green" />;
      case 'closed':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-2 space-y-2">
      {mergeRequests.map((mr) => (
        <motion.div
          key={mr.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-editor-bg p-3 rounded-lg hover:bg-active-tab transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <GitPullRequest size={16} className="text-accent-purple" />
            <span className="font-mono text-sm text-accent-purple">{mr.id}</span>
            {getStatusIcon(mr.status)}
          </div>
          {isSidebarOpen && (
            <>
              <p className="text-editor-text mt-2">{mr.title}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-editor-text opacity-70">
                <div className="flex items-center">
                  <User size={14} className="mr-1" />
                  {mr.author}
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {mr.date}
                </div>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default MergeRequestsView;