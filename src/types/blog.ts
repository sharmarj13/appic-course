export type BlogCategory =
  | 'Career'
  | 'Technology'
  | 'Design'
  | 'Development'
  | 'Business'
  | 'Learning';

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  keyTakeaway?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
  imageUrl?: string;
  visualTheme: 'navy' | 'blue' | 'indigo' | 'slate';
  author: {
    name: string;
    role: string;
    initials: string;
    bio: string;
  };
  sections: BlogSection[];
}
