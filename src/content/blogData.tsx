import type { BlogPost } from '../types';
import { parseFrontMatter } from './parseFrontMatter';

const parseBlogMarkdown = (rawMarkdown: string): { metadata: Partial<BlogPost>; content: string } => {
  const { fields, content } = parseFrontMatter(rawMarkdown);
  const metadata: Partial<BlogPost> = {};
  if (typeof fields['title'] === 'string') metadata.title = fields['title'];
  if (typeof fields['date'] === 'string') metadata.date = fields['date'];
  if (typeof fields['summary'] === 'string') metadata.summary = fields['summary'];
  return { metadata, content };
};

// Get the blog markdown files.
const rawBlogPosts = import.meta.glob('./blogposts/*.md', { eager: true, query: 'raw' });

// Parse them.
export const blogPosts: BlogPost[] = Object.entries(rawBlogPosts).map(([path, module]) => {
  // Get slug from filename: e.g., "./content/recipes/vegan-tiramisu.md" -> "vegan-tiramisu"
  const slug = path.split('/').pop()?.replace('.md', '') || 'unknown-slug';
  
  // The raw string is inside the 'default' property of the imported module
  const rawMarkdown = (module as { default: string }).default;
  
  const { metadata, content } = parseBlogMarkdown(rawMarkdown);

  // Construct the final Recipe object
  // Provide defaults in case front matter is missing
  return {
    slug: slug,
    title: 'Untitled Post',
    date: '',
    summary: '',
    ...metadata, // Override defaults with parsed data
    content: content,
  };
});
