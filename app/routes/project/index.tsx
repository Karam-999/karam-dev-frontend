import { useState } from 'react';

import type { Route } from './+types/index'; //route is a type that is imported from './+types/index'
import type { Project, StrapiResponse, StrapiProject } from '~/types'; //importing Project type from app/types.ts
import ProjectCard from '~/components/ProjectCard';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Karam-is-a-dev | Projects' },
    { name: 'description', content: 'Welcome to Karam-is-a-dev!' },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projectss: Project[] }> {
  //request is a built-in object that represents the HTTP request made by the client to the server. its type is Route.LoaderArgs which is imported from './+types/index'
  const fetched = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );
  const dataa: StrapiResponse<StrapiProject> = await fetched.json(); //data has The content fetched from the server in JSON format
  // console.log('this is', { projects: dataa });///logs in server(not in browser console because loader runs on server side) without refreshing page because loader runs on server side
  //it returns this is {
  //   projects: [
  //     {
  //       id: '1',
  //       title: 'DevDash',
  //       description: 'A productivity dashboard for developers to track tasks, goals, and inspiration.',
  //       image: '/images/project-1.png',
  //       url: 'https://example.com',
  //       date: '2025-02-01',
  //       category: 'Fullstack',
  //       featured: false
  //     },
  const projects = dataa.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    // image: item.image?.url
    //   ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
    //   : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  return { projectss: projects };
  // Packing data/content into a box labeled "projects"
} //The name "data" only exists inside the loader function. The component doesn't know this variable name exists.

//In the Loader: You took the generic data and gave it a specific name: projects.
//In the Component: loaderData looked for that specific name (projects) to find your content.

const ProjectPage = ({ loaderData }: Route.ComponentProps) => {
  //   console.log('loaderData haha', loaderData);//only returns after refreshing the page because it is client side
  // it logs loaderData haha {
  //   projects: [
  //     {
  //       id: '1',
  //       title: 'DevDash',
  //       description: 'A productivity dashboard for developers to track tasks, goals, and inspiration.',
  //       image: '/images/project-1.png',
  //       url: 'https://example.com',
  //       date: '2025-02-01',
  //       category: 'Fullstack',
  //       featured: false
  //     },...]}
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const { projectss } = loaderData as { projectss: Project[] };
  // console.log('the projects', projects);////only returns after refreshing the page because it is client side
  //it returns: the projects [
  //   {
  //     id: '1',
  //     title: 'DevDash',
  //     description: 'A productivity dashboard for developers to track tasks, goals, and inspiration.',
  //     image: '/images/project-1.png',
  //     url: 'https://example.com',
  //     date: '2025-02-01',
  //     category: 'Fullstack',
  //     featured: false
  //   },..]

  //get unique categories
  const categories = [
    'All',
    ...new Set(projectss.map((projectt) => projectt.category)),
  ];
  //   console.log(categories);

  //filter projects based on category
  const filteredProjects =
    selectedCategory === 'All'
      ? projectss
      : projectss.filter((projectt) => projectt.category === selectedCategory);

  ///calculating total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  //get current projects
  const idxlast = currentPage * projectsPerPage;
  const idxfirst = idxlast - projectsPerPage;
  const currentProjects = filteredProjects.slice(idxfirst, idxlast);

  return (
    <>
      <div className='text-3xl font-bold text-center mt-10 mb-10'>
        💻 Projects
      </div>
      <div className='flex flex-wrap justify-center gap-4 text-center mb-5 text-sm'>
        {categories.map((category) => (
          <button
            className={`py-2 px-4 rounded${category === selectedCategory ? ' bg-blue-600 text-white cursor-pointer' : ' bg-gray-700'}`}
            key={category}
            onClick={() => {
              console.log('hello');
              setSelectedCategory(category);
              setCurrentPage(1);
            }}>
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode='wait'>
        <motion.div layout className='grid gap-4 sm:grid-cols-2'>
          {currentProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              <ProjectCard projjects={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ProjectPage;
