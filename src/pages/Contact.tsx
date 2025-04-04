import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Globe, 
  Twitter, 
  MessageSquare,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const [copied, setCopied] = React.useState(false);
  const email = 'your.email@example.com';

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={24} />,
      url: 'https://github.com/yourusername',
      username: '@yourusername'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      url: 'https://linkedin.com/in/yourusername',
      username: 'Your Name'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={24} />,
      url: 'https://twitter.com/yourusername',
      username: '@yourusername'
    },
    {
      name: 'Website',
      icon: <Globe size={24} />,
      url: 'https://yourwebsite.com',
      username: 'yourwebsite.com'
    }
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="border-b border-border-color pb-6">
          <h1 className="text-4xl font-bold text-accent-blue mb-4"># Get in Touch</h1>
          <p className="text-editor-text text-lg">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out through any of the channels below.
          </p>
        </div>

        {/* Email Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-accent-purple">## Direct Contact</h2>
          <div className="bg-secondary-bg rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Mail className="text-accent-blue" size={24} />
                <span className="text-editor-text">{email}</span>
              </div>
              <button
                onClick={copyEmail}
                className="flex items-center px-4 py-2 bg-editor-bg rounded-lg text-editor-text hover:bg-active-tab transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle size={16} className="mr-2 text-accent-green" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-2" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-accent-purple">## Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-6 bg-secondary-bg rounded-lg hover:bg-active-tab transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-accent-blue group-hover:text-accent-purple transition-colors">
                  {link.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold text-editor-text">{link.name}</h3>
                  <p className="text-editor-text opacity-80">{link.username}</p>
                </div>
                <ExternalLink size={16} className="text-editor-text opacity-50 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact Form Alternative */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-accent-purple">## Quick Message</h2>
          <div className="bg-secondary-bg rounded-lg p-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <MessageSquare size={20} className="mr-2" />
              Send Email
            </a>
            <p className="text-center text-editor-text mt-4 opacity-80">
              Click above to open your default email client
            </p>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="bg-editor-bg rounded-lg p-6 border border-border-color">
          <p className="text-editor-text text-center">
            <span className="text-accent-green">// </span>
            I typically respond to messages within 24-48 hours
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;