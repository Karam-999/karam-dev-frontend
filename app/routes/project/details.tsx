import type { Route } from './+types/details';
import type { Project, StrapiResponse } from '~/types';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import type { StrapiProject } from '~/types';

export async function loader({ params }: Route.LoaderArgs) {
  const { karam } = params;
  const res = await fetch(
    // `${import.meta.env.VITE_API_URL}/projects/${params.karam}?populate=*`
    `${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${karam}&populate=*`
  );
  if (!res.ok) {
    throw new Response('Failed to fetch product details', {
      status: res.status,
    });
  }
  const details: StrapiResponse<StrapiProject> = await res.json();
  console.log('this is the end:', details);
  //   this is the end: {
  //   data: [
  //     {
  //       id: 3,
  //       documentId: 'xlt3nb13cs49idxmovavzebt',
  //       title: 'CodeCritic',
  //       description: 'A code snippet review tool with comments and upvotes\n',
  //       url: 'https://example.com',
  //       date: '2025-12-24',
  //       category: 'Design',
  //       featured: false,
  //       createdAt: '2025-12-14T13:21:47.179Z',
  //       updatedAt: '2025-12-14T13:21:47.179Z',
  //       publishedAt: '2025-12-14T13:21:46.563Z',
  //       image: [Object]
  //     }
  //   ],
  //   meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } }
  // }
  const item = details.data[0]; //because data is an array with single object inside it. if we don't do [0], item will be an array not an object
  console.log('this is item:', item);
  //   this is item: {
  //   id: 3,
  //   documentId: 'xlt3nb13cs49idxmovavzebt',
  //   title: 'CodeCritic',
  //   description: 'A code snippet review tool with comments and upvotes\n',
  //   url: 'https://example.com',
  //   date: '2025-12-24',
  //   category: 'Design',
  //   featured: false,
  //   createdAt: '2025-12-14T13:21:47.179Z',
  //   updatedAt: '2025-12-14T13:21:47.179Z',
  //   publishedAt: '2025-12-14T13:21:46.563Z',
  //   image: {
  //     id: 5,
  //     documentId: 'egyuattn01cc56qg2rq6llrj',
  //     name: 'project-5.png',
  //     alternativeText: null,
  //     caption: null,
  //     width: 1080,
  //     height: 720,
  //     formats: {
  //       large: [Object],
  //       small: [Object],
  //       medium: [Object],
  //       thumbnail: [Object]
  //     },
  //     hash: 'project_5_954b7e3815',
  //     ext: '.png',
  //     mime: 'image/png',
  //     size: 106.59,
  //     url: '/uploads/project_5_954b7e3815.png',
  //     previewUrl: null,
  //     provider: 'local',
  //     provider_metadata: null,
  //     createdAt: '2025-12-14T13:20:58.098Z',
  //     updatedAt: '2025-12-14T13:20:58.098Z',
  //     publishedAt: '2025-12-14T13:20:58.098Z'
  //   }
  // }
  const project: Project = {
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
  };
  console.log('this is the project:', project);
  //   this is the project: {
  //   id: 3,
  //   documentId: 'xlt3nb13cs49idxmovavzebt',
  //   title: 'CodeCritic',
  //   description: 'A code snippet review tool with comments and upvotes\n',
  //   image: 'http://localhost:1337/uploads/project_5_954b7e3815.png',
  //   url: 'https://example.com',
  //   date: '2025-12-24',
  //   category: 'Design',
  //   featured: false
  // }
  return { project };
}
// export async function clientLoader({
//   request,
//   params,
// }: Route.ClientLoaderArgs): Promise<{ details: Project }> {
//   const res = await fetch(
//     `${import.meta.env.VITE_API_URL}/projects/${params.karam}`
//   );
//   if (!res.ok) {
//     throw new Response('Failed to fetch product details', {
//       status: res.status,
//     });
//   }
//   const details = await res.json();
//   return { details };
// }

// HydrateFallback is rendered while the client loader is running
// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

const ProjectDetails = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;
  // const detailss = project;
  console.log(project);
  return (
    <>
      <Link
        to='/project'
        className='flex items-center max-w-44 text-blue-400 mb-3 mr-1 bg-gray-900 px-3.5 py-2  md:text-md rounded-lg'>
        <FaArrowLeft className='mr-2' /> Back to Projects
      </Link>
      <div className='grid gap-8 md:grid-cols-2 items-start'>
        <div>
          <img
            src={project.image}
            alt={project.title}
            className='w-full rounded-lg shadow--md'
          />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-blue-400 mb-4'>
            {project.title}
          </h1>
          <p className='text-gray-300 text-sm mb-6'>
            {new Date(project.date).toLocaleDateString()} + {project.category}
          </p>
          <p className='text-gray-200 text-sm mb-5'>{project.description}</p>
          <a
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 font-semibold hover:bg-blue-700 transition-colors duration-300 inline-block'>
            View Live Site
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
