import type { PostMetaa } from '~/types';
import { Link } from 'react-router';

const PostCard = ({ post }: { post: PostMetaa }) => {
  return (
    <article className='bg-gray-800 p-6 rounded-lg shadow mb-4'>
      <h3 className='text-2xl font-semibold text-blue-400'>{post.title}</h3>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className='mt-3 w-full h-48 mb-3 object-cover rounded'></img>
      )}
      <p className='text-gray-400 text-sm mt-2 mb-2'>
        {new Date(post.date).toDateString()}
      </p>
      <p className='text-gray-300 mt-4'>{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className='mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300'>
        Read More →
      </Link>
    </article>
  );
};

export default PostCard;
