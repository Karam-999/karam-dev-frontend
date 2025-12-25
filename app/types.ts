export type Project = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  url: string;
  image: string;
  date: string;
  category: string;
  featured: boolean;
};

export type PostMetaa = {
  id: string;
  image?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body?: string;
};

export type BlogPostDetailPageProps = {
  loaderData: {
    post: PostMetaa;
    markdown: string;
  };
};

export type StrapiResponse<T> = {
  data: T[];
};
export type StrapiProject = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  url: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      large?: {
        url: string;
      };
    };
  };
  date: string;
  category: string;
  featured: boolean;
};
export type StrapiPost = {
  id: string;
  // documentId: string;
  slug: string;
  title: string;
  excerpt: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      large?: {
        url: string;
      };
    };
  };
  date: string;
  body: string;
};
