import type { Route } from './+types/index';
import FeaturedProjects from '~/components/FeaturedProjects';
import type {
  Project,
  StrapiProject,
  StrapiResponse,
  StrapiPost,
} from '~/types';
import AboutPreview from '~/components/AboutPreview';
import type { PostMetaa } from '~/types';
// import { useEffect } from 'react';
import LatestPosts from '~/components/LatestPost';
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Karam-is-a-dev | Home' },
    { name: 'description', content: 'Welcome to Karam-is-a-dev!' },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; postMetas: PostMetaa[] }> {
  // const res = await fetch(url.href);
  const url = new URL(request.url);
  // const res = await fetch(url.href);

  // if (!res.ok) {
  //   throw new Error('Failed to fetch blog posts');
  // }
  const [fetched, postMetak] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`
    ),
    fetch(
      `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
    ),
  ]);

  if (!fetched.ok || !postMetak.ok) {
    throw new Response('Failed to fetch projects or blog posts', {
      status: 500,
    });
  }

  // const fetched = await fetch(`${import.meta.env.VITE_API_URL}/projects/`);

  // if (!fetched.ok) {
  //   throw new Response('Failed to fetch projects', { status: 500 });
  // }
  // const [dataa, postMetasData] = await Promise.all([
  //   fetched.json(),
  //   postMetas.json(),
  // ]);
  // console.log(dataa, postMetasData, 'this is sick');
  const projectsJson: StrapiResponse<StrapiProject> = await fetched.json();
  const postJson: StrapiResponse<StrapiPost> = await postMetak.json();

  const dataa = projectsJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    // image: item.image?.url
    //   ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
    //   : '/images/no-image.png',
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));
  const poost = postJson.data.map((item) => ({
    id: item.id,
    excerpt: item.excerpt,
    slug: item.slug,
    title: item.title,

    // image: item.image?.url
    //   ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
    //   : '/images/no-image.png',

    date: item.date,
  }));
  console.log(dataa);
  return {
    projects: dataa,
    postMetas: poost,
  };
}

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { projects, postMetas } = loaderData as {
    projects: Project[];
    postMetas: PostMetaa[];
  };
  // console.log('Home Page Projects:', projects);

  // console.log('Home Page Rendered');console error solved

  // const now = Date.now();
  // if (typeof window === 'undefined') {
  //  console.log('Server Side Render Time:', now);
  // }
  // else {
  //   console.log('Client Side Render Time(client hydration):', now);
  // }

  return (
    <>
      <div className=''>
        <FeaturedProjects featuredProjects={projects} count={2} />

        <AboutPreview />
        <LatestPosts posts={postMetas} limit={2} />
      </div>
    </>
  );
};
export default Home;
