import { useState } from 'react';
import type { Route } from './+types/index';
import type { PostMetaa, StrapiResponse, StrapiPost } from '~/types';
import { Link } from 'react-router';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';
import PostFilter from '~/components/PostsFilter';
import { body } from 'framer-motion/client';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Karam-is-a-dev | Blogs' },
    { name: 'description', content: 'Welcome to Karam-is-a-dev!' },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMetaa[] }> {
  // const url = new URL('/posts-meta.json', request.url);
  // const res = await fetch(url.href);
  const post = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
  );
  if (!post.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  const data11: StrapiResponse<StrapiPost> = await post.json();
  // now it will return the posts from strapi with all details
  //if we destructure it,
  const data1 = data11.data;
  console.log('the king is alive', data1);
  const datas = data1.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    body: item.body,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    // image: item.image.url ? `${import.meta.env.VITE_STRAPI_URL}${item.image?.url}` : '/images/no-image.png',
  }));
  console.log('the wind is flowing', datas);
  // datas.sort((a: PostMetaa, b: PostMetaa) => {
  //   return new Date(b.date).getTime() - new Date(a.date).getTime();
  // });

  //can also sort like this, infact this what i was using before

  // console.log('the wind is flowing to the north', datas);
  return { posts: datas };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchthePosts, setSearchthePosts] = useState('');

  const postsPerPage = 10;
  const { posts } = loaderData;
  // console.log(posts);
  // const thesearchthePosts = ((q) => setSearchthePosts(q));
  const filteredPosts = posts.filter((postas) => {
    return (
      postas.title.toLowerCase().includes(searchthePosts.toLowerCase()) ||
      postas.excerpt.toLowerCase().includes(searchthePosts.toLowerCase())
    );
  });

  const totalPagessss = Math.ceil(filteredPosts.length / postsPerPage);

  const indexOfLastPost = pageNumber * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <div className='text-3xl font-bold text-center m-8'>📝 Blogs </div>
      <PostFilter
        searchQuery={searchthePosts}
        onSearchChange={(queryy) => {
          setSearchthePosts(queryy);
          setPageNumber(1);
        }}
      />
      <div className='space-y-8'>
        {currentPosts.length === 0 ? (
          <p className='text-center text-gray-400'>No posts found.</p>
        ) : null}
      </div>
      {currentPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {totalPagessss > 1 && (
        <Pagination
          totalPages={totalPagessss}
          currentPage={pageNumber}
          setCurrentPage={setPageNumber}
        />
      )}
    </div>
  );
};

export default BlogPage;
