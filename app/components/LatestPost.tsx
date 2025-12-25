import type { PostMetaa } from '~/types';
import { Link } from 'react-router';
type LatestPostsProps = {
  posts: PostMetaa[];
  limit?: number;
};

const LatestPosts = ({ posts, limit = 3 }: LatestPostsProps) => {
    const latestPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const limitedPosts = latestPosts.slice(0, limit);
  return (
    <section className='mx-auto max-w-6xl px-6 py-12'>
      <h2 className='text-2xl font-bold mb-6 text-white'>Latest Blog Posts</h2>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-2'>
        {limitedPosts.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.id}
            className='block border border-gray-700 rounded-lg p-6 hover:shadow-md transition bg-gray-800'>
            <h3 className='text-xl font-semibold mb-2 text-blue-400 mb-1'>
              {post.title}
                </h3>
                <p className='text-gray-400 text-sm mb-4'>{post.excerpt}</p>
                <span className='text-gray-500 text-xs'>
                  {new Date(post.date).toDateString()}
                </span>    
          </Link>
        ))}
      </div>
    </section>
  );
};
export default LatestPosts;
