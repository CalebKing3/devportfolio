import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Code2,
  Calendar,
  Star,
  GitFork,
  FileJson, Boxes,
} from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('json', json);

interface TeamMember {
  role: string;
  name: string;
}

interface ProjectMetrics {
  [key: string]: string | number;
}


type Project = { id: string; name: string; description: string; longDescription: string; technologies: string[]; github: string; demo: string; image: string; status: string; lastUpdated: string; stars: number; forks: number; features: string[]; metrics: ProjectMetrics; team: TeamMember[]; };
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async (): Promise<void> => {
    
    const fetchedProjects: Project[] = [
      {
        id: 'cloudsync',        
        name: 'CloudSync',
        description: 'Distributed cloud storage system with real-time synchronization',
        longDescription: 'A high-performance distributed cloud storage system that enables real-time file synchronization across multiple devices. Built with a focus on security, scalability, and reliability.',
        technologies: ['Go', 'gRPC', 'Redis', 'Docker'],
        github: 'https://github.com/username/cloudsync',
        demo: 'https://cloudsync-demo.com',
        image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=500',
        status: 'Active Development',
        lastUpdated: '2024-03-15',
        stars: 245,
        forks: 45,
        features: ['Real-time sync across devices',
        'Version control and file history',
        'Collaborative sharing features'],
        metrics: {
              uptimePercentage: '99.99%', 
              filesStoredCount: '1M+',
              dataProcessed: '5TB/day'
          },
          team: [
            { role: 'Lead Developer', name: 'John Doe' },
            { role: 'DevOps Engineer', name: 'Jane Smith' }
        ]
      },

      {
        id: 'devmetrics',
        name: 'DevMetrics',
        description: 'Developer productivity analytics platform', // Added missing comma here
        longDescription:
          'An advanced analytics platform that helps engineering teams track and improve their development productivity through data-driven insights and metrics.', 
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        github: 'https://github.com/username/devmetrics',        
        demo: 'https://devmetrics-demo.com',        
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
        status: 'Stable',
        lastUpdated: '2024-03-10',
        stars: 189,
        forks: 32,
        features: ['Git repository analytics',
        'Team performance metrics',
        'Code quality insights',
        'Custom dashboard creation'],
        metrics: {
            organizationsCount: '50+', 
          repositoriesCount: '1,000+',
          developersCount: '500+',
          commitsAnalyzedCount: '1M+'
        },
            team: [
            { role: 'Frontend Lead', name: 'Alice Johnson' },
            { role: 'Backend Engineer', name: 'Bob Wilson' }
            ]
      },
      {
        
        id: 'securevault',
        name: 'SecureVault',
        description: 'Zero-knowledge encryption password manager',
        longDescription: 'A secure password management solution that uses zero-knowledge encryption to ensure user credentials are protected even from the service provider.',
        technologies: ['Go', 'WebAssembly', 'React', 'SQLite'],
        github: 'https://github.com/username/securevault',
        demo: 'https://securevault-demo.com',
        image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500',
        status: 'Beta',
        lastUpdated: '2024-03-01',
        stars: 156,
        forks: 28,
        features: ['Cross-platform sync',
        'Password health analysis',
        'Secure sharing'],
        metrics: {
              passwordsCount: '100,000+',
              usersCount: '5,000+',              
              avgPasswordStrength: '92%' 
          },
          team: [
            { role: 'Security Engineer', name: 'Carol Brown' },
          { role: 'Full Stack Developer', name: 'David Lee' }
        ]
      }
    ];

    localStorage.setItem('cachedProjects', JSON.stringify(fetchedProjects));
  }, []); // Removed cachedProjects from dependency array
  
  const [projects, setProjects] = useState<Project[]>([]);  
  
  useEffect(() => {
    const storedProjects = localStorage.getItem('cachedProjects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      fetchProjects().catch(error => {
        console.error("Failed to fetch projects:", error);
      });
    }
  }, [fetchProjects]);  

  useEffect(() => {
    localStorage.setItem('cachedProjects', JSON.stringify(projects));    
  }, [projects]);

  const renderProjectDetails = (project: Project) => {
    const projectJson = JSON.stringify(
      { name: project.name,
        status: project.status,
        lastUpdated: project.lastUpdated,
        repository: {
          url: project.github,
          stars: project.stars,
          forks: project.forks
        },
        technologies: project.technologies,
        features: project.features,
        metrics: project.metrics, // Keep metrics as they are
        team: project.team ,// Keep team as they are
      }, null, 2);

    return (
      <motion.div
        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setSelectedProject(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-editor-bg rounded-lg max-w-4xl w-full mx-4 overflow-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-border-color bg-secondary-bg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileJson size={20} className="text-accent-blue mr-2" />
              <span className="font-mono text-editor-text">{project.id}.json</span>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="p-1 hover:bg-active-tab rounded-lg transition-colors"
            >
              <X size={20} className="text-editor-text" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <SyntaxHighlighter
              language="json"
              style={atomOneDark}
              showLineNumbers
              customStyle={{
                margin: '0',
                padding: '1.5rem',
                background: 'var(--editor-bg)',
                borderRadius: '0.5rem'
              }}>

              {projectJson}</SyntaxHighlighter>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-editor-bg py-8">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between" >
          <div className="flex items-center">
              <Boxes size={24} className="text-accent-blue mr-2" />
              <h1 className="text-2xl font-mono font-bold text-editor-text">Featured Projects</h1>
            </div>
          </div>

           {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary-bg rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                    />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Code2 size={24} className="text-white" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-mono font-bold text-accent-blue">
                      {project.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs ${project.status === "Active Development"
                      ? 'bg-accent-green/20 text-accent-green'
                      : project.status === "Beta"? 'bg-accent-purple/20 text-accent-purple'
                        : 'bg-accent-blue/20 text-accent-blue'
                    }`}>
                      {project.status}
                      </span>
                  </div>                  
                  <p className="text-editor-text text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4 items-center">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-editor-bg rounded text-xs text-accent-green"
                      >
                        {tech}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border-color">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center text-editor-text" title="stars">
                        <Star size={14} className="mr-1" />
                        {project.stars}
                        </span>
                      <span className="flex items-center text-editor-text" title="forks">
                        <GitFork size={14} className="mr-1" />
                        {project.forks}
                      </span>
                    </div>
                    <span className="flex items-center text-sm text-editor-text">
                      <Calendar size={14} className="mr-1" />
                      {project.lastUpdated}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div></div>        
      {/* Project Details Modal */}
        <AnimatePresence>{selectedProject && renderProjectDetails(selectedProject)}</AnimatePresence>
    </div>);
};

export default Projects;
