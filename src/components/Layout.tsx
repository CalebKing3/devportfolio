import React, { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  FolderGit2, 
  FileText, 
  Mail, 
  Menu,
  X,
  Terminal as TerminalIcon,
  Github,
  Bug,
  File,
  Folder,
  Code,
  Package,
  Coffee,
  FileJson,
  FileType,
  Bot,
  Keyboard,
  ChevronRight
} from 'lucide-react';
import CopilotChat from './CopilotChat';
import ViewSwitcher from './ViewSwitcher';
import ProjectView from './ProjectView';
import CommitsView from './CommitsView';
import MergeRequestsView from './MergeRequestsView';
import StructureView from './StructureView';
import Terminal from './Terminal';
import Shortcuts from './Shortcuts';
import ThemeToggle from './ThemeToggle';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isStructureSidebarOpen, setStructureSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('structureSidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isBottomPanelOpen, setBottomPanelOpen] = useState(() => {
    const saved = localStorage.getItem('bottomPanelOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [currentView, setCurrentView] = useState('project');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <Home size={16} />, label: 'Home' },
    { path: '/about', icon: <User size={16} />, label: 'About' },
    { path: '/projects', icon: <FolderGit2 size={16} />, label: 'Projects' },
    { path: '/articles', icon: <FileText size={16} />, label: 'Blog' },
    { path: '/resume', icon: <FileText size={16} />, label: 'Resume' },
    { path: '/contact', icon: <Mail size={16} />, label: 'Contact' },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        // On mobile, collapse sidebars by default
        if (isSidebarOpen) setSidebarOpen(false);
        if (isStructureSidebarOpen) setStructureSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen, isStructureSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('structureSidebarOpen', JSON.stringify(isStructureSidebarOpen));
  }, [isStructureSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('bottomPanelOpen', JSON.stringify(isBottomPanelOpen));
  }, [isBottomPanelOpen]);

  // On mobile, close sidebar when location changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
      setStructureSidebarOpen(false);
    }
  }, [location, isMobile]);

  const getFileName = (path: string) => {
    switch (path) {
      case '/': return 'home.tsx';
      case '/about': return 'about.tsx';
      case '/projects': return 'projects.tsx';
      case '/articles': return 'articles.tsx';
      case '/contact': return 'contact.tsx';
      case '/resume': return 'resume.tsx';
      default: return 'unknown.tsx';
    }
  };

  const getFileIcon = (path: string) => {
    switch (path) {
      case '/': return <Home size={16} className="text-accent-blue" />;
      case '/about': return <User size={16} className="text-accent-purple" />;
      case '/projects': return <FolderGit2 size={16} className="text-accent-green" />;
      case '/articles': return <FileText size={16} className="text-accent-yellow" />;
      case '/resume': return <FileText size={16} className="text-accent-orange" />;
      case '/contact': return <Mail size={16} className="text-accent-red" />;
      default: return <File size={16} />;
    }
  };

  return (
    <div className="ide-window">
      {/* Menu Bar */}
      <div className="ide-menubar">
        <div className="flex items-center h-full overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `ide-menubar-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span className="ml-1.5">{item.label}</span>
            </NavLink>
          ))}
        </div>
        <div className="flex items-center h-full flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>

      {/* Breadcrumbs - WebStorm style */}
      <div className="breadcrumbs">
        <div className="breadcrumb-item">
          <span className="text-accent-yellow">portfolio</span>
        </div>
        <div className="breadcrumb-item">
          <span className="text-accent-blue">src</span>
        </div>
        <div className="breadcrumb-item">
          <span className="text-accent-green">pages</span>
        </div>
        <div className="breadcrumb-item">
          <span>{getFileName(location.pathname)}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ide-main">
        {/* Left Sidebar */}
        <AnimatePresence>
          <motion.div
            key="left-sidebar"
            initial={false}
            animate={{ 
              width: isSidebarOpen ? 250 : 48,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            className={`ide-sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}
          >
            <div className="ide-sidebar-header">
              <div className="flex items-center justify-between">
                {isSidebarOpen && <span>Project</span>}
                <button 
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="p-1 hover:bg-active-tab rounded-sm transition-colors"
                  title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                >
                  {isSidebarOpen ? <X size={14} /> : <Menu size={14} />}
                </button>
              </div>
            </div>

            <ViewSwitcher
              currentView={currentView}
              onViewChange={setCurrentView}
              isSidebarOpen={isSidebarOpen}
            />
            
            {currentView === 'project' && (
              <ProjectView
                fileTree={{}}
                expandedFolders={expandedFolders}
                toggleFolder={() => {}}
                isSidebarOpen={isSidebarOpen}
              />
            )}
            {currentView === 'commits' && (
              <CommitsView isSidebarOpen={isSidebarOpen} />
            )}
            {currentView === 'merge-requests' && (
              <MergeRequestsView isSidebarOpen={isSidebarOpen} />
            )}
            {currentView === 'structure' && (
              <StructureView isSidebarOpen={isSidebarOpen} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Editor Area */}
        <div className="flex flex-col flex-1">
          <div className="ide-tabs">
            {navItems.map(item => (
              <NavLink 
                key={item.path}
                to={item.path}
                className={({ isActive }) => `ide-tab ${isActive ? 'active' : ''}`}
              >
                {getFileIcon(item.path)}
                <span className="ml-2">{getFileName(item.path)}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="ide-editor flex-1 overflow-auto">
            <div className="editor-content">
              {children}
            </div>
          </div>

          {/* Bottom Panel */}
          <AnimatePresence>
            {isBottomPanelOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 300, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="ide-bottom-panel"
              >
                <div className="ide-bottom-panel-header">
                  <div className="flex items-center flex-1">
                    <TerminalIcon size={14} className="mr-2 text-accent-blue" />
                    <span className="text-sm text-editor-text">Terminal</span>
                  </div>
                  <button 
                    onClick={() => setBottomPanelOpen(false)}
                    className="p-1 hover:bg-active-tab rounded-sm"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="ide-bottom-panel-content">
                  <Terminal />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar */}
        <AnimatePresence>
          <motion.div
            key="right-sidebar"
            initial={false}
            animate={{ 
              width: isStructureSidebarOpen ? 300 : 48,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            className={`ide-sidebar copilot-sidebar ${!isStructureSidebarOpen ? 'collapsed' : ''}`}
          >
            {!isStructureSidebarOpen ? (
              <div className="flex flex-col items-center py-2 space-y-2">
                <button 
                  onClick={() => {
                    setStructureSidebarOpen(true);
                    setShowShortcuts(false);
                  }}
                  className="p-2 hover:bg-active-tab rounded-sm transition-colors text-editor-text"
                  title="Open Copilot"
                >
                  <Bot size={16} />
                </button>
                <button 
                  onClick={() => {
                    setStructureSidebarOpen(true);
                    setShowShortcuts(true);
                  }}
                  className="p-2 hover:bg-active-tab rounded-sm transition-colors text-editor-text"
                  title="Keyboard Shortcuts"
                >
                  <Keyboard size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="ide-sidebar-header">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowShortcuts(false)}
                        className={`p-1.5 rounded-sm transition-colors ${!showShortcuts ? 'bg-selection-bg text-editor-text' : 'hover:bg-active-tab text-editor-text'}`}
                        title="GitHub Copilot"
                      >
                        <Bot size={14} />
                      </button>
                      <button
                        onClick={() => setShowShortcuts(true)}
                        className={`p-1.5 rounded-sm transition-colors ${showShortcuts ? 'bg-selection-bg text-editor-text' : 'hover:bg-active-tab text-editor-text'}`}
                        title="Keyboard Shortcuts"
                      >
                        <Keyboard size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => setStructureSidebarOpen(false)}
                      className="p-1 hover:bg-active-tab rounded-sm transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                {showShortcuts ? (
                  <Shortcuts isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
                ) : (
                  <CopilotChat 
                    isOpen={isStructureSidebarOpen}
                    onClose={() => setStructureSidebarOpen(false)}
                  />
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status Bar */}
      <div className="ide-statusbar">
        <div className="flex items-center">
          <div className="ide-statusbar-item">
            <span>TypeScript</span>
          </div>
          <div className="ide-statusbar-item">
            <span>UTF-8</span>
          </div>
          {!isBottomPanelOpen && (
            <div className="ide-statusbar-item">
              <button
                onClick={() => setBottomPanelOpen(true)}
                className="flex items-center hover:opacity-100 opacity-80"
                title="Show Terminal (Ctrl+`)"
              >
                <TerminalIcon size={12} className="mr-1" />
                <span>Terminal</span>
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <div className="ide-statusbar-item">
            <ThemeToggle />
          </div>
          <div className="ide-statusbar-item">
            <Github size={12} className="mr-1" />
            <span>main</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;