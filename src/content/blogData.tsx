import type { BlogPost } from '../types';

// Parse the blogbost markdown.
const parseRecipeMarkdown = (rawMarkdown: string) => {
  const parts = rawMarkdown.match(/---\n([\s\S]*?)\n---/);
  let metadata: Partial<BlogPost> = {};
  let content = rawMarkdown;

  if (parts && parts.length > 1) {
    const frontMatter = parts[1];
    frontMatter.split('\n').forEach(line => {
      // Try to match a new key-value pair
      const match = line.match(/^\s*([^:]+):\s*(.*)/);
      if (match) {
        const key = match[1].trim().toLowerCase();
        let value = match[2].trim().replace(/['"]/g, ''); // Remove quotes

        // Map all keys to the Recipe interface
        switch (key) {
          case 'title': metadata.title = value; break;
          case 'date': metadata.date = value; break;
          case 'summary': metadata.summary = value; break;
        }
      }
    });
    
    // Remove the Front Matter block from the final content
    content = rawMarkdown.replace(/---\n([\s\S]*?)\n---/, '').trim();
  }
  return { metadata, content };
};

// Get the blog markdown files.
const rawBlogPosts = import.meta.glob('./blogposts/*.md', { eager: true, query: 'raw' });

// Parse them.
export const blogPosts: BlogPost[] = Object.entries(rawBlogPosts).map(([path, module]) => {
  // Get slug from filename: e.g., "./content/recipes/vegan-tiramisu.md" -> "vegan-tiramisu"
  const slug = path.split('/').pop()?.replace('.md', '') || 'unknown-slug';
  
  // The raw string is inside the 'default' property of the imported module
  const rawMarkdown = module.default; 
  
  const { metadata, content } = parseRecipeMarkdown(rawMarkdown);

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
