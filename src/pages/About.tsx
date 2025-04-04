import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Coffee, 
  Brain, 
  Rocket, 
  Heart,
  Terminal,
  Github,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const codeSnippet = `const developer = {
  name: "Your Name",
  traits: [
    "Problem Solver",
    "Clean Code Advocate",
    "Continuous Learner"
  ],
  passions: [
    "Web Development",
    "Open Source",
    "Teaching"
  ],
  // Fun fact: I once debugged code in my dreams!
};`;

  const skills = [
    { name: 'Frontend', level: 90 },
    { name: 'Backend', level: 85 },
    { name: 'DevOps', level: 75 },
    { name: 'UI/UX', level: 80 },
  ];

  const funFacts = [
    {
      icon: <Coffee />,
      title: "Coffee Coding",
      description: "Once wrote an entire microservice powered by coffee - 247 cups to be exact!"
    },
    {
      icon: <Brain />,
      title: "Eternal Student",
      description: "Learned 3 programming languages while traveling across Southeast Asia"
    },
    {
      icon: <Heart />,
      title: "Open Source Love",
      description: "Contributed to 50+ open source projects in the last year"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Lead at InnovateCo",
      content: "One of the most dedicated developers I've worked with. Always goes the extra mile.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
      name: "Michael Chen",
      role: "Senior Engineer at TechGiant",
      content: "Exceptional problem-solving skills and a great team player.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 editor-content">
      <div className="space-y-12">
        {/* Header Section */}
        <div className="border-b border-border-color pb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 text-accent-blue"
          >
            # About Me
          </motion.h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('story')}
              className={`px-4 py-2 rounded ${activeTab === 'story' ? 'bg-active-tab text-accent-blue' : 'text-editor-text'}`}
            >
              <Terminal size={16} className="inline mr-2" />
              My Story
            </button>
            <button 
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded ${activeTab === 'skills' ? 'bg-active-tab text-accent-blue' : 'text-editor-text'}`}
            >
              <Code2 size={16} className="inline mr-2" />
              Skills
            </button>
            <button 
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 rounded ${activeTab === 'achievements' ? 'bg-active-tab text-accent-blue' : 'text-editor-text'}`}
            >
              <Rocket size={16} className="inline mr-2" />
              Achievements
            </button>
          </div>
        </div>

        {/* Dynamic Content Section */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'story' && (
            <div className="space-y-8">
              {/* Personal Introduction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-accent-purple mb-4">## The Journey</h2>
                  <p className="text-editor-text leading-relaxed mb-4">
                    Started my coding journey at age 12 with BASIC, evolved through multiple languages and frameworks, 
                    and now specialize in building scalable web applications. Passionate about clean code, performance optimization,
                    and creating exceptional user experiences.
                  </p>
                  <p className="text-editor-text leading-relaxed">
                    When not coding, you'll find me contributing to open source projects, mentoring junior developers,
                    or exploring new technologies.
                  </p>
                </div>
                <div className="bg-editor-bg rounded-lg p-4">
                  <div className="bg-menu-bg px-4 py-2 text-sm text-editor-text mb-2">
                    developer.ts
                  </div>
                  <SyntaxHighlighter 
                    language="typescript"
                    style={atomOneDark}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: 'var(--editor-bg)',
                    }}
                  >
                    {codeSnippet}
                  </SyntaxHighlighter>
                </div>
              </div>

              {/* Fun Facts */}
              <div>
                <h2 className="text-2xl font-bold text-accent-purple mb-4">## Fun Facts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {funFacts.map((fact, index) => (
                    <motion.div
                      key={fact.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-secondary-bg p-4 rounded-lg"
                    >
                      <div className="text-accent-blue mb-2">{fact.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{fact.title}</h3>
                      <p className="text-editor-text text-sm">{fact.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div>
                <h2 className="text-2xl font-bold text-accent-purple mb-4">## Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.3 }}
                      className="bg-secondary-bg p-6 rounded-lg"
                    >
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-accent-blue">{testimonial.name}</h3>
                          <p className="text-sm text-editor-text">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-editor-text italic">"{testimonial.content}"</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-accent-purple">## Technical Proficiency</h2>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-editor-text">{skill.name}</span>
                      <span className="text-accent-blue">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary-bg rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="h-full bg-accent-blue rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Core Technologies */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-secondary-bg p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-accent-blue mb-4">Frontend</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      React & Next.js
                    </li>
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      TypeScript
                    </li>
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      Tailwind CSS
                    </li>
                  </ul>
                </div>
                <div className="bg-secondary-bg p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-accent-blue mb-4">Backend</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      Node.js
                    </li>
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      Python
                    </li>
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      PostgreSQL
                    </li>
                  </ul>
                </div>
                <div className="bg-secondary-bg p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-accent-blue mb-4">DevOps</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      Docker
                    </li>
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      AWS
                    </li>
                    <li className="flex items-center text-editor-text">
                      <ChevronRight size={16} className="mr-2" />
                      CI/CD
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-accent-purple">## Notable Achievements</h2>
              
              {/* Professional Achievements */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-secondary-bg p-6 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <Rocket className="text-accent-blue mr-4" size={24} />
                    <h3 className="text-xl font-bold">Led Development of Enterprise SaaS Platform</h3>
                  </div>
                  <p className="text-editor-text mb-4">
                    Architected and led the development of a SaaS platform serving 100,000+ users.
                    Improved system performance by 300% and reduced infrastructure costs by 60%.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="flex items-center text-accent-blue hover:underline">
                      <Github size={16} className="mr-2" />
                      View Project
                    </a>
                    <a href="#" className="flex items-center text-accent-blue hover:underline">
                      <ExternalLink size={16} className="mr-2" />
                      Case Study
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-secondary-bg p-6 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <Code2 className="text-accent-blue mr-4" size={24} />
                    <h3 className="text-xl font-bold">Open Source Contributions</h3>
                  </div>
                  <p className="text-editor-text mb-4">
                    Core contributor to popular open source projects with 1000+ stars.
                    Created developer tools used by thousands of developers worldwide.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="flex items-center text-accent-blue hover:underline">
                      <Github size={16} className="mr-2" />
                      View Contributions
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Side Projects */}
              <div>
                <h2 className="text-2xl font-bold text-accent-purple mb-4">## Side Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary-bg p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-bold text-accent-blue mb-2">Developer Blog</h3>
                    <p className="text-editor-text mb-4">
                      Technical blog with 50k+ monthly readers. Featured on popular developer platforms.
                    </p>
                    <a href="#" className="text-accent-blue hover:underline flex items-center">
                      Visit Blog <ExternalLink size={16} className="ml-2" />
                    </a>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-secondary-bg p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-bold text-accent-blue mb-2">Tech Mentorship</h3>
                    <p className="text-editor-text mb-4">
                      Mentored 20+ junior developers. Created comprehensive learning resources.
                    </p>
                    <a href="#" className="text-accent-blue hover:underline flex items-center">
                      Learn More <ExternalLink size={16} className="ml-2" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default About;