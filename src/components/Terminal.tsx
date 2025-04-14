import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence import

interface Command {
  command: string;
  description: string;
  execute: () => string;
};

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<string[]>([
    `Welcome to Caleb's Terminal! Type "help" to see available commands.`,
  ]);
  const [suggestions, setSuggestions] = useState<Command[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      command: 'help',
      description: 'Show available commands',
      execute: () => `Available commands:
        help         - Show this help message
        clear        - Clear the terminal
        about        - Learn about Caleb
        experience   - View work experience
        education    - Show educational background
        skills       - List technical skills
        contact      - Get contact information
        projects     - List major projects
        achievements - View notable achievements`

    },
    {
      command: 'about',
      description: 'Learn about Caleb',
      execute: () => `Caleb King - Senior Engineering Director

A passionate technology leader with extensive experience in building and scaling engineering teams.
Currently leading multiple development teams and driving technical excellence across organizations.
Focused on creating innovative solutions and fostering a culture of continuous learning.`
    },
    {
      command: 'experience',
      description: 'View work experience',
      execute: () => `
        Professional Experience:

        Senior Engineering Director | Current
        - Leading multiple development teams
        - Implementing engineering best practices
        - Driving technical strategy and innovation

        Previous Positions:
- Engineering Manager at TechCorp (2020-2022)
- Senior Software Engineer at InnovateCo (2018-2020)
- Full Stack Developer at StartupXYZ (2016-2018)`
    },
    {
      command: 'education',
      description: 'Show educational background',
      execute: () => `
        Education:

        - Master's in Computer Science
          Stanford University, 2016
          Focus: Distributed Systems

        - Bachelor's in Software Engineering
  MIT, 2014
  Graduated with Honors`
    },
    {
      command: 'skills',
      description: 'List technical skills',
      execute: () => `Technical Skills:
        
        Languages:
        - TypeScript/JavaScript
        - Python
        - Go
        - Java

        Technologies:
        - React/Next.js
        - Node.js
        - Docker/Kubernetes
        - AWS/GCP

        Leadership:
        - Team Building
        - Technical Strategy
        - Process Optimization
        - Agile/SAFe`
    },
    {
      command: 'contact',
      description: 'Get contact information',
      execute: () => `Contact Information:

Email: calebking3@gmail.com
LinkedIn: linkedin.com/in/calebking3
GitHub: github.com/calebking3
Website: kingcaleb.com`
    },
    {
      command: 'projects',
      description: 'List major projects',
      execute: () => `
        Major Projects:

        1. CloudSync
        - Distributed cloud storage system
        - 10,000+ active users

        2. DevMetrics
        - Developer productivity platform
        - Used by 50+ organizations

        3. SecureVault
        - Zero-knowledge password manager
        - 5,000+ active users`
    },
    {
      command: 'achievements',
      description: 'View notable achievements',
      execute: () => `Notable Achievements:

- Led development of enterprise SaaS platform serving 100,000+ users
- Improved system performance by 300%
- Reduced infrastructure costs by 60%
- Core contributor to popular open source projects
- Speaker at major tech conferences
- Published technical articles with 50k+ monthly readers`
    },
    {
      command: 'clear',
      description: 'Clear the terminal',
      execute: () => ''
    }
  ];  

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const matchingCommands = commands
        .filter(cmd => cmd.command.startsWith(value.trim()))
        .map(cmd => cmd);
      setSuggestions(matchingCommands);
      setShowSuggestions(matchingCommands.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      const command = input.trim();
      const cmdObj = commands.find(cmd => cmd.command === command);


      if (cmdObj) {
        if (command === 'clear') {
          setOutput([]);
        } else {
          setOutput(prev => [...prev, `$ ${command}`, cmdObj.execute()]);
        }
      } else {
        setOutput(prev => [...prev, `$ ${command}`, `Command not found: ${command}`]);
      }

      setHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
      setInput('');
      setSuggestions([]);
      setShowSuggestions(false);
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[0].command);
      setSuggestions([]);
      setShowSuggestions(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="h-full bg-terminal-bg text-terminal-text font-mono text-sm p-4 relative">
      <div className="absolute top-0 right-0 flex space-x-2 p-2">
        <Square className="text-red-500 h-3 w-3" />
        <Square className="text-yellow-500 h-3 w-3" />
        <Square className="text-green-500 h-3 w-3" />
      </div>
      <div className="overflow-auto h-full">
        <motion.div className="space-y-2">
          {output.map((line, i) => {
            const isCommand = line.startsWith('$');
            const displayLine = isCommand ? line.substring(2) : line;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={isCommand ? 'flex items-center' : 'whitespace-pre-wrap ml-4'}
              >
                {isCommand && <ChevronRight size={16} className="text-terminal-text-light mr-2" />}
                {displayLine}
              </motion.div>
            );
          })}
          <motion.div className="flex items-center">
            <ChevronRight size={16} className="text-terminal-text-light mr-2" /> 
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-terminal-text"
                autoFocus
              />            
          </motion.div>
        </motion.div>
      </div>      
        <AnimatePresence>
          {showSuggestions && (
            <motion.ul
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="mt-2 ml-6 space-y-1 bg-terminal-bg-light border border-terminal-border rounded-sm shadow-md"
              style={{ position: 'absolute', bottom: '20px', width: 'calc(100% - 2rem)' }}
            >
              {suggestions.map((suggestion: Command) => (
                <li key={suggestion.command} className="px-4 py-1 hover:bg-terminal-bg transition-colors">
                  <span className="text-editor-text opacity-70">{suggestion.command}</span>
                  <span className="text-editor-text opacity-50 ml-2"> - {suggestion.description}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
          </div>
  );
};

export default Terminal;