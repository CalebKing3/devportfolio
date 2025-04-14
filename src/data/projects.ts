// src/data/projects.ts
export interface Project {
  name: string;
  slug: string;
  description: string;
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
  challenges?: string;
  solution?: string;
}

export const projects: Project[] = [
  {
    name: "Project Alpha",
    slug: "project-alpha",
    description:
      "An innovative web application built with cutting-edge technologies to solve a real-world problem.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    liveDemoUrl: "https://project-alpha-demo.com",
    githubUrl: "https://github.com/user/project-alpha",
    screenshots: [
      "https://via.placeholder.com/800x400?text=Project+Alpha+Screenshot+1",
      "https://via.placeholder.com/800x400?text=Project+Alpha+Screenshot+2",
    ],
    challenges: "Integrating various APIs and ensuring data consistency across the application.",
    solution: "Utilized a centralized state management system and implemented robust data validation checks.",
  },
  {
    name: "Project Beta",
    slug: "project-beta",
    description:
      "A mobile-first application designed to enhance user engagement and provide a seamless experience.",
    technologies: ["React Native", "JavaScript", "Firebase"],
    liveDemoUrl: "https://project-beta-demo.com",
    githubUrl: "https://github.com/user/project-beta",
    screenshots: [
      "https://via.placeholder.com/800x400?text=Project+Beta+Screenshot+1",
      "https://via.placeholder.com/800x400?text=Project+Beta+Screenshot+2",
    ],
    challenges: "Optimizing app performance for various mobile devices and handling offline data synchronization.",
    solution: "Implemented lazy loading for images and optimized data fetching strategies. Used service workers for offline support.",
  },
  {
    name: "Project Gamma",
    slug: "project-gamma",
    description:
      "A powerful desktop tool built to automate complex tasks and improve productivity.",
    technologies: ["Electron", "JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/user/project-gamma",
    screenshots: [
      "https://via.placeholder.com/800x400?text=Project+Gamma+Screenshot+1",
    ],
    challenges: "Developing a cross-platform desktop application and managing resource usage.",
    solution: "Leveraged Electron's built-in modules for cross-platform support. Implemented efficient memory management.",
  },
];