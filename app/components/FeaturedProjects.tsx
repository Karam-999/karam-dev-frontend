import { section } from 'framer-motion/client';
import type { Project } from '~/types';
import ProjectCard from './ProjectCard';
type FeaturedProjectsProps = {
  featuredProjects: Project[];
  count?: number;
};

const FeaturedProjects = ({ featuredProjects, count = 1 }: FeaturedProjectsProps) => {
  // const featuredProjects = project
  //   .filter((proj) => proj.featured)
  //   .slice(0, count);
  console.log(featuredProjects);
  if (featuredProjects.length === 0) {
    return null;
  }
  return (
    <section>
      <h2 className='text-2xl text-gray-200 font-bold mb-6'>
        ✨Featured Projects
      </h2>
      <div className='grid gap-2 sm:grid-cols-2'>
        {featuredProjects.map((proj) => (
          <ProjectCard projjects={proj} key={proj.id} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
