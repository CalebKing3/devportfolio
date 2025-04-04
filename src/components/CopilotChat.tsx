import React, { useState } from 'react';
import { Bot, ChevronRight, MessageSquare, MessagesSquare, Search, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  type: 'bot' | 'option';
  content: string;
}

interface CopilotChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const funFacts = [
  "I was created by StackBlitz to help developers write better code!",
  "I can explain code in multiple programming languages.",
  "I love helping developers learn and grow.",
  "I'm constantly learning from interactions with developers.",
  "I can provide context-aware suggestions based on your codebase."
];

const CopilotChat: React.FC<CopilotChatProps> = ({ isOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const handleExplainCode = () => {
    setMessages([
      { type: 'bot', content: funFacts[currentFactIndex] },
      { type: 'bot', content: "Would you like to hear another fact or learn about the code?" }
    ]);
    setShowOptions(true);
  };

  const handleNextFact = () => {
    const nextIndex = (currentFactIndex + 1) % funFacts.length;
    setCurrentFactIndex(nextIndex);
    setMessages([
      { type: 'bot', content: funFacts[nextIndex] },
      { type: 'bot', content: "Would you like to hear another fact or learn about the code?" }
    ]);
  };

  const options = [
    {
      label: "Tell me another fact",
      action: handleNextFact,
      icon: <RefreshCw size={16} className="text-accent-purple mr-2" />
    },
    {
      label: "Explain the architecture",
      action: () => handleOptionClick("Let me explain the architecture..."),
      icon: <ChevronRight size={16} className="text-accent-purple mr-2" />
    },
    {
      label: "Show data flow",
      action: () => handleOptionClick("Here's how the data flows..."),
      icon: <ChevronRight size={16} className="text-accent-purple mr-2" />
    },
    {
      label: "Suggest improvements",
      action: () => handleOptionClick("Here are some potential improvements..."),
      icon: <ChevronRight size={16} className="text-accent-purple mr-2" />
    },
    {
      label: "Explain state management",
      action: () => handleOptionClick("Let's look at the state management..."),
      icon: <ChevronRight size={16} className="text-accent-purple mr-2" />
    }
  ];

  const handleOptionClick = (response: string) => {
    setMessages(prev => [...prev, 
      { type: 'option', content: "Tell me more" },
      { type: 'bot', content: response }
    ]);
    setShowOptions(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4">
        <div className="bg-editor-bg rounded-lg p-4 mb-4">
          <p className="text-editor-text opacity-70">
            GitHub Copilot is ready to help! Ask me anything about the code.
          </p>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 mb-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start max-w-[80%] ${message.type === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
                  {message.type === 'bot' && (
                    <Bot size={20} className="text-accent-purple mr-2 mt-1" />
                  )}
                  <div className={`rounded-lg p-3 ${
                    message.type === 'bot' 
                      ? 'bg-editor-bg text-editor-text' 
                      : 'bg-accent-purple text-white'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Options */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-2"
            >
              {options.map((option, index) => (
                <motion.button
                  key={option.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={option.action}
                  className="w-full p-3 bg-editor-bg rounded-lg text-left hover:bg-active-tab transition-colors flex items-center"
                >
                  {option.icon}
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {messages.length === 0 && (
          <div className="space-y-4">
            <button 
              onClick={handleExplainCode}
              className="w-full p-3 bg-editor-bg rounded-lg text-left hover:bg-active-tab transition-colors"
            >
              <MessagesSquare size={16} className="inline-block mr-2 text-accent-purple" />
              Explain this code
            </button>
            <button className="w-full p-3 bg-editor-bg rounded-lg text-left hover:bg-active-tab transition-colors">
              <MessageSquare size={16} className="inline-block mr-2 text-accent-purple" />
              Suggest improvements
            </button>
            <button className="w-full p-3 bg-editor-bg rounded-lg text-left hover:bg-active-tab transition-colors">
              <Search size={16} className="inline-block mr-2 text-accent-purple" />
              Find similar patterns
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border-color">
        <div className="text-sm text-editor-text opacity-70">
          Powered by GitHub Copilot
        </div>
      </div>
    </div>
  );
};

export default CopilotChat;