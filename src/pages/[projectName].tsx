
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { useSearchParams } from 'next/navigation';
import projectsData from '../../data/projects';

interface Project {
  name: string;
  slug: string;
  description: string;
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
  challenges: string;
  solution: string;
}

const ProjectDetailPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectName = searchParams.get('projectName');
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectName) {
      const foundProject = projectsData.find((p) => p.slug === projectName);
      setProject(foundProject || null);
    }
  }, [projectName]);

  const handleBack = () => {
    router.back();
  }

  if (!project) {
    return <div className="p-8 dark:bg-gray-800 dark:text-white flex-grow text-center">
              <h1 className="text-4xl font-bold mb-6 text-white">Project not Found</h1>
            </div>
  }

  return (
    <div className="p-8 dark:bg-gray-800 dark:text-white flex-grow ">
      <Button onClick={handleBack} color="gray" className="mb-8 ">
        Back to Projects
      </Button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">{project.name}</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">About</h2>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Technologies</h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">
                {tech}
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Challenges</h2>
          <p className="text-gray-300 leading-relaxed">{project.challenges}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Solution</h2>
          <p className="text-gray-300 leading-relaxed">{project.solution}</p>
        </section>

        {project.liveDemoUrl && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Live Demo</h2>
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Live Demo
            </a>
          </section>
        )}
        {project.githubUrl && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">GitHub Repository</h2>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on GitHub
            </a>
          </section>
        )}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Screenshots</h2>
            <div className="flex gap-4 overflow-x-auto">
              {project.screenshots.map((screenshot, index) => (
                <img key={index} src={screenshot} alt={`Screenshot ${index + 1} of ${project.name}`} className="w-80 h-48 object-cover" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;