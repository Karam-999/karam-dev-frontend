import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMetaa, StrapiPost, StrapiResponse } from '~/types';
import type { BlogPostDetailPageProps } from '~/types';
import { Link } from 'react-router';

// Predeclare markdown files so Vite can bundle them
const posts = import.meta.glob('/posts/*.md', {
  query: '?raw',
  import: 'default',
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const { slug } = params; //geting slug from url/params

  // const url = new URL(`/posts-meta.json`, request.url); //fetching post meta data
  // const res = await fetch(url.href);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image&sort=date:desc`
  );
  //   console.log('ehhaejhjhfjhfjgfj', res);
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  // const index = await res.json(); //array pf all the post meta data
  const PostMeta: StrapiResponse<StrapiPost> = await res.json();
  // const PostMeta = index.find((post: PostMetaa) => post.slug === slug); //finding if the sug from url matches any post slug in the index [array of post meta data]
  if (!PostMeta.data.length) throw new Response('Not Found', { status: 404 });
  console.log('uyugjhjhfjgf', PostMeta);
  ///Dynamically import raw markdown
  //   const markdown = await import(`../../posts/${slug}.md?raw`); //importing raw markdown file content which has same name as slug
  // const loadPost = posts[`/posts/${slug}.md`];
  // if (!loadPost) throw new Response('Post not found', { status: 404 });
  // // const markdown = (await loadPost()) as string;

  const item = PostMeta.data[0]; //because data is an array with single object inside it. if we don't do [0], item will be an array not an object
  console.log(item);

  const post = {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    // image: item.image?.url
    //   ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
    //   : '/images/no-image.png',
  };

  return {
    post,
    // markdown, //getting the default export from the imported markdown file
  };
}

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailPageProps) => {
  const { post } = loaderData;
  console.log('cooopyyyyyy', post);
  return (
    <div className='max-w-3xl mx-auto px-10 py-10 bg-gray-900'>
      <h1 className='text-3xl text-blue-400 mb-4 font-bold'>{post.title}</h1>
      <p className='text-sm text-gray-500 mb-4'>
        {new Date(post.date).toDateString()}
        {/* • {PostMeta.readingTime} min read */}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className='w-full h-64 object-cover mb-6 rounded '
      />
      <div className='max-w-none mb-10 prose prose-invert prose-a:text-blue-400 hover:prose-a:text-blue-500'>
        {/* prose class will style the markdown content */}
        <ReactMarkdown>{post.body}</ReactMarkdown>
        <Link to='/blogs' className='text-blue-500 hover:underline mt-5 block'>
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogPostDetailsPage;
