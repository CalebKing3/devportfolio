export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  author: string;
  excerpt: string;
  slug: string;
  readingTime: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}