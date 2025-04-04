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
  ChevronRight,
  Search,
  Settings,
  Split,
  Database,
  Layers,
  Bell,
  Info,
  CheckCircle2,
  Play,
  AlertTriangle
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
    // Default to true so terminal is visible on page load
    const saved = localStorage.getItem('bottomPanelOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [terminalHeight, setTerminalHeight] = useState(() => {
    const saved = localStorage.getItem('terminalHeight');
    return saved !== null ? JSON.parse(saved) : 200; // Default height
  });
  const [currentView, setCurrentView] = useState('project');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTool, setActiveTool] = useState('terminal');
  const location = useLocation();
  const terminalPanelRef = React.useRef<HTMLDivElement>(null);

  // Effect to scroll to terminal on initial load
  useEffect(() => {
    if (isBottomPanelOpen && terminalPanelRef.current) {
      setTimeout(() => {
        // Use scrollIntoView to ensure the terminal is visible
        terminalPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, []);

  const navItems = [
    { path: '/', icon: <Home size={16} />, label: 'Home' },
    { path: '/about', icon: <User size={16} />, label: 'About' },
    { path: '/projects', icon: <FolderGit2 size={16} />, label: 'Projects' },
    { path: '/articles', icon: <FileText size={16} />, label: 'Blog' },
    { path: '/resume', icon: <FileText size={16} />, label: 'Resume' },
    { path: '/contact', icon: <Mail size={16} />, label: 'Contact' },
  ];

  // Terminal drag resizing logic
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const containerHeight = window.innerHeight;
    const mouseY = e.clientY;
    const newHeight = containerHeight - mouseY;
    
    // Limit the height between min and max values
    const limitedHeight = Math.max(100, Math.min(500, newHeight));
    
    setTerminalHeight(limitedHeight);
    localStorage.setItem('terminalHeight', limitedHeight.toString());
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };

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

  // Setup mouse move and mouse up listeners for dragging
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const containerHeight = window.innerHeight;
        const mouseY = e.clientY;
        const newHeight = containerHeight - mouseY;
        
        // Limit the height between min and max values
        const limitedHeight = Math.max(100, Math.min(500, newHeight));
        
        setTerminalHeight(limitedHeight);
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
        document.body.classList.remove('select-none');
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.classList.add('select-none');
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.classList.remove('select-none');
      };
    }
  }, [isDragging]);

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

  const bottomTools = [
    { id: 'terminal', icon: <TerminalIcon size={16} />, label: 'Terminal' },
    { id: 'problems', icon: <AlertTriangle size={16} />, label: 'Problems' },
    { id: 'output', icon: <Split size={16} />, label: 'Output' },
    { id: 'debug', icon: <Bug size={16} />, label: 'Debug' },
  ];

  return (
    <div className="ide-window">
      {/* Menu Bar */}
      <div className="ide-menubar">
        <div className="flex items-center h-full overflow-x-auto">
          <div className="ide-app-logo px-2 flex items-center">
            <Code size={18} className="text-accent-blue mr-1" />
            <span className="text-editor-text font-semibold">DevPortfolio</span>
          </div>
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
          <div className="ide-menubar-item">
            <Search size={16} />
          </div>
          <div className="ide-menubar-item relative">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-blue rounded-full"></span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Top Toolbar - JetBrains style */}
      <div className="ide-toolbar">
        <div className="flex items-center space-x-1">
          <button className="ide-toolbar-btn" title="Run">
            <Play size={16} className="text-accent-green" />
          </button>
          <button className="ide-toolbar-btn" title="Debug">
            <Bug size={16} />
          </button>
          <span className="ide-toolbar-separator"></span>
          <button className="ide-toolbar-btn" title="Settings">
            <Settings size={16} />
          </button>
          <button className="ide-toolbar-btn" title="Structure">
            <Layers size={16} />
          </button>
          <span className="ide-toolbar-separator"></span>
          <div className="ide-toolbar-status flex items-center">
            <CheckCircle2 size={14} className="text-accent-green mr-1" />
            <span className="text-xs text-editor-text whitespace-nowrap overflow-hidden text-ellipsis">Indexing completed</span>
          </div>
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

      {/* Bottom Panel - Always visible but resizable */}
      <div 
        className={`ide-bottom-panel-container ${isBottomPanelOpen ? '' : 'ide-bottom-panel-collapsed'}`}
        style={{ height: isBottomPanelOpen ? `${terminalHeight}px` : '32px' }}
        ref={terminalPanelRef}
      >
        {/* Bottom panel handle for resizing */}
        <div 
          className="ide-bottom-panel-handle"
          onMouseDown={handleDragStart}
        ></div>

        {/* Bottom panel tabs */}
        <div className="ide-bottom-panel-tabs">
          {bottomTools.map(tool => (
            <button 
              key={tool.id}
              className={`ide-bottom-panel-tab ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => setActiveTool(tool.id)}
            >
              {tool.icon}
              <span className="ml-2">{tool.label}</span>
            </button>
          ))}
          <div className="flex-grow"></div>
          <button 
            className="ide-bottom-panel-btn"
            onClick={() => setIsBottomPanelOpen(!isBottomPanelOpen)}
          >
            {isBottomPanelOpen ? <X size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* Bottom panel content */}
        {isBottomPanelOpen && (
          <div className="ide-bottom-panel-content">
            {activeTool === 'terminal' && <Terminal />}
            {activeTool === 'problems' && (
              <div className="p-4 text-editor-text">
                <div className="flex items-center mb-4">
                  <AlertTriangle size={16} className="mr-2 text-accent-yellow" />
                  <span>0 errors, 2 warnings found in workspace</span>
                </div>
                <div className="bg-editor-bg p-3 rounded mb-2 border-l-2 border-accent-yellow">
                  <div className="flex">
                    <AlertTriangle size={14} className="mr-2 text-accent-yellow flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm">Unused variable 'isSelected' (warning)</p>
                      <p className="text-xs opacity-70">src/components/UniversalSearch.tsx:45:10</p>
                    </div>
                  </div>
                </div>
                <div className="bg-editor-bg p-3 rounded border-l-2 border-accent-yellow">
                  <div className="flex">
                    <AlertTriangle size={14} className="mr-2 text-accent-yellow flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm">Missing dependency 'filters' in useEffect hook (warning)</p>
                      <p className="text-xs opacity-70">src/pages/Projects.tsx:127:8</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTool === 'output' && (
              <div className="p-4 text-editor-text font-mono text-sm">
                <p className="text-accent-green">$ npm run build</p>
                <p className="opacity-70">Building for production...</p>
                <p className="opacity-70"> webstorm-portfolio@0.0.0 build</p>
                <p className="opacity-70"> vite build</p>
                <p className="opacity-70">✓ 1421 modules transformed.</p>
                <p className="opacity-70">dist/index.html 4.07 kB</p>
                <p className="opacity-70">dist/assets/index-BT_J8d-K.css 12.82 kB</p>
                <p className="opacity-70">dist/assets/index-Dk3MPqid.js 142.36 kB</p>
                <p className="text-accent-green">✓ built in 3.82s</p>
              </div>
            )}
            {activeTool === 'debug' && (
              <div className="flex items-center justify-center h-full text-editor-text">
                <div className="text-center">
                  <Bug size={24} className="mx-auto mb-2 opacity-50" />
                  <p>No active debug session</p>
                  <button className="mt-2 px-3 py-1 bg-active-tab rounded text-sm hover:bg-selection-bg">
                    Start Debugging
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
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
          <div className="ide-statusbar-item">
            <span>LF</span>
          </div>
          <div className="ide-statusbar-item">
            <Database size={12} className="mr-1" />
            <span>Connected</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ide-statusbar-item">
            <Info size={12} className="mr-1" />
            <span>0:0</span>
          </div>
          <div className="ide-statusbar-item">
            <span>Spaces: 2</span>
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