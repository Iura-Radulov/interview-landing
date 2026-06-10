export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string; // ISO date string
  readTime: string; // e.g. "8 min read"
  category: string;
  tags: string[];
  author: string;
  image?: string; // optional hero image path
  published: boolean;
}
