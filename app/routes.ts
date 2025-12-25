import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  layout('routes/layout/home.tsx', [index('routes/home/index.tsx')]),
  layout('routes/layout/main.tsx', [
    route('about', './routes/about/index.tsx'),
    route('contact', './routes/contact/index.tsx'),
    route('project', './routes/project/index.tsx'),
    route('project/:karam', './routes/project/details.tsx'),
    route('blogs', './routes/blogs/index.tsx'),
    route('blog/:slug', './routes/blogs/details.tsx'),
    route('*', './routes/errors/not-found.tsx'),
  ]),
] satisfies RouteConfig;
