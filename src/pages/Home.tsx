import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm, { type Root } from 'remark-gfm';
import { Eye, Code, Copy, ExternalLink } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Home = () => {
  const [viewMode, setViewMode] = useState<'markdown' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);

  const markdownContent = `# Caleb King 👨‍💻
## Director of Engineering

<div align="center">
    <img src="https://i.imgur.com/dBAa38d.png" alt="Caleb King profile picture" loading="lazy" width="200" />
</div>


Experienced engineering leader with a proven track record of building and scaling high-performance development teams. Passionate about fostering innovation, implementing efficient development processes, and delivering exceptional software solutions.

## 🚀 Professional Summary

Currently serving as Director of Engineering, leading multiple development teams and driving technical excellence across the organization. Specializing in:

- Engineering Leadership & Team Building
- Technical Architecture & System Design
- Agile Development & Process Optimization
- Cloud Infrastructure & DevOps
- Performance Optimization & Scalability

## 💼 Technical Leadership

\`\`\`typescript
interface EngineeringDirector {
  leadership: {
    teamSize: number;
    departments: string[];
    methodology: string;
  };
  expertise: string[];
  impact: {
    deliverables: string[];
    metrics: Record<string, number>;
  };
}

const calebKing: EngineeringDirector = {
  leadership: {
    teamSize: 50,
    departments: [
      "Frontend Development",
      "Backend Systems",
      "DevOps",
      "QA & Testing"
    ],
    methodology: "Agile/SAFe"
  },
  expertise: [
    "System Architecture",
    "Cloud Infrastructure",
    "Team Building",
    "Process Optimization",
    "Technical Strategy"
  ],
  impact: {
    deliverables: [
      "Microservices Architecture",
      "CI/CD Pipeline Optimization",
      "Cloud Migration Strategy",
      "Engineering Standards"
    ],
    metrics: {
      deploymentFrequency: 200,  // % increase
      teamProductivity: 150,     // % increase
      systemUptime: 99.99,       // percentage
      costReduction: 35          // % decrease
    }
  }
};
\`\`\`

## 🛠 Technical Stack

### Cloud & Infrastructure
- AWS (Advanced)
- Google Cloud Platform
- Azure
- Kubernetes
- Docker

### Development & Tools
- TypeScript/JavaScript
- Python
- Go
- React/Next.js
- Node.js
- PostgreSQL/MongoDB

### DevOps & Monitoring
- Jenkins/GitHub Actions
- Terraform
- Prometheus/Grafana
- ELK Stack
- New Relic

## 🏆 Key Achievements

1. **System Architecture Transformation**
   - Led the migration from monolithic to microservices architecture
   - Reduced deployment time by 75%
   - Improved system scalability and reliability

2. **Team Growth & Development**
   - Scaled engineering team from 15 to 50+ members
   - Implemented mentorship and career development programs
   - Established engineering excellence standards

3. **Process Optimization**
   - Introduced automated testing and CI/CD practices
   - Achieved 99.99% system uptime
   - Reduced infrastructure costs by 35%

## 📈 Leadership Approach

\`\`\`mermaid
graph TD
    
    style A fill:#4a9eff,stroke:#333,stroke-width:2px
    style B fill:#b39ddb,stroke:#333,stroke-width:2px
    style C fill:#67c23a,stroke:#333,stroke-width:2px
    A[Technical Vision] --> B[Team Empowerment]
    B --> C[Process Optimization]
    C --> D[Continuous Innovation]
    D --> A
    
    style A fill:#4a9eff,stroke:#333,stroke-width:2px
    style B fill:#b39ddb,stroke:#333,stroke-width:2px
    style C fill:#67c23a,stroke:#333,stroke-width:2px
    style D fill:#cc7832,stroke:#333,stroke-width:2px
\`\`\`

<div align="center">
    <img src="https://i.imgur.com/X5yY5T9.png" alt="Microservices Architecture" loading="lazy" width="400" />
</div>



## 🎯 Current Focus

- Scaling distributed systems architecture
- Implementing AI/ML capabilities
- Enhancing developer experience
- Building high-performance engineering culture

## 📫 Connect

- [GitHub](https://github.com/calebking)
- [LinkedIn](https://linkedin.com/in/calebking)
- [Twitter](https://twitter.com/calebking)
- [Blog](https://calebking.dev)

## 🤝 Mentorship

Actively involved in mentoring and growing the next generation of engineering leaders. Open to connecting with:

- Aspiring engineering managers
- Technical leads transitioning to management
- Senior engineers seeking career guidance

---

> "Building great software is about empowering great teams."

Looking to collaborate or discuss engineering leadership? Feel free to reach out!
`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderers = {
    code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: string[]; node: Root; }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomOneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '1.5rem 0',
            borderRadius: '0.5rem',
            background: 'var(--editor-bg)',
          }}
          {...props}
        >
          {String(children?.[0]).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="min-h-screen bg-editor-bg">
      {/* Header */}
      <div className="border-b border-border-color bg-secondary-bg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-selection-bg text-accent-blue'
                    : 'text-editor-text hover:bg-active-tab'
                }`}
              >
                <Eye size={16} className="mr-2" />
                Preview
              </button>
              <button
                onClick={() => setViewMode('markdown')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'markdown'
                    ? 'bg-selection-bg text-accent-blue'
                    : 'text-editor-text hover:bg-active-tab'
                }`}
              >
                <Code size={16} className="mr-2" />
                Markdown
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center px-3 py-1 rounded hover:bg-active-tab transition-colors text-editor-text"
              >
                {copied ? (
                  <span className="text-accent-green">Copied!</span>
                ) : (
                  <>
                    <Copy size={16} className="mr-2" />
                    Copy
                  </>
                )}
              </button>
              <a
                href="https://github.com/calebking"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1 rounded hover:bg-active-tab transition-colors text-editor-text"
              >
                <ExternalLink size={16} className="mr-2" />
                Open in GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="max-w-4xl mx-auto px-6 py-8"
      >
        {viewMode === 'markdown' ? (
          <div className="font-mono bg-editor-bg rounded-lg p-6 text-editor-text whitespace-pre-wrap">
            {markdownContent}
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={renderers}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;