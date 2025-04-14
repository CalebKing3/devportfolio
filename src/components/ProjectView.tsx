import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects';

interface Project {
  name: string;
  slug: string;
  description: string;
  technologies: string[];
}

const ProjectView: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8 text-white">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project: Project) => (
          <Link key={project.slug} to={`/projects/${project.slug}`}>
            <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">{tech}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectView;
