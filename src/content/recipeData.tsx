import type { Recipe } from '../types';

// --- 1. UPDATED PARSER ---
// This function now parses *all* fields from the front matter.
const parseRecipeMarkdown = (rawMarkdown: string) => {
  const parts = rawMarkdown.match(/---\n([\s\S]*?)\n---/);
  let metadata: Partial<Recipe> = {};
  let content = rawMarkdown;

  if (parts && parts.length > 1) {
    const frontMatter = parts[1];
    let inTagsBlock = false;
    let tags: string[] = [];

    frontMatter.split('\n').forEach(line => {
      // Check for tag list items
      if (inTagsBlock) {
        const tagMatch = line.match(/^\s*-\s*(.*)/);
        if (tagMatch) {
          tags.push(tagMatch[1].trim());
          return; // Move to the next line
        } else {
          // No match, so the tag block is over
          inTagsBlock = false;
        }
      }
      
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
          case 'serves': metadata.serves = value; break;
          case 'active cook time': metadata.activeCookTime = value; break;
          case 'total time': metadata.totalTime = value; break;
          case 'imageurl': metadata.imageUrl = value; break;
          case 'sourceurl': metadata.sourceUrl = value; break;
          case 'tags': inTagsBlock = true; break;
          // Add any other keys you want to parse here
        }
      }
    });
    if (tags.length > 0) metadata.tags = tags;
    
    // Remove the Front Matter block from the final content
    content = rawMarkdown.replace(/---\n([\s\S]*?)\n---/, '').trim();
  }
  return { metadata, content };
};


// --- 2. IMPORT MARKDOWN FILES ---
// This Vite-specific function synchronously imports all .md files 
// in the /src/recipes/ directory as raw text strings.
const recipeModules = import.meta.glob('./recipes/*.md', { eager: true, query: 'raw' });


// --- 3. PROCESS ORIGINAL RECIPES ---
const originalRecipes: Recipe[] = Object.entries(recipeModules).map(([path, module]) => {
  // Get slug from filename: e.g., "./content/recipes/vegan-tiramisu.md" -> "vegan-tiramisu"
  const slug = path.split('/').pop()?.replace('.md', '') || 'unknown-slug';
  
  // The raw string is inside the 'default' property of the imported module
  const rawMarkdown = module.default; 
  
  const { metadata, content } = parseRecipeMarkdown(rawMarkdown);

  // Construct the final Recipe object
  // Provide defaults in case front matter is missing
  return {
    slug: slug,
    title: 'Untitled Recipe',
    date: '2025-01-01',
    summary: 'No summary provided.',
    type: 'original',
    ...metadata, // Override defaults with parsed data
    content: content,
  };
});


// --- 4. DEFINE CURATED RECIPES ---
// These are still defined manually since they don't have local markdown files.
const curatedRecipes: Recipe[] = [
  {
    slug: 'curated-steak',
    type: 'curated',
    title: 'Reverse Seared Ribeye',
    date: '2023-10-01',
    summary: 'The best method for cooking a thick-cut steak, ensuring a perfect edge-to-edge medium-rare cook and a phenomenal crust.',
    sourceUrl: 'https://www.seriouseats.com/reverse-seared-steak-recipe',
    imageUrl: "https://www.seriouseats.com/thmb/9xlGr_x7-SXqYSWWnov68rr1kVM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2017__02__20170217-reverse-sear-steak-02-d86b7f4676d240c196acf6903523c99f.jpg",
    content: 'This is my go-to technique for thick-cut steaks. The *Serious Eats* method is foolproof...', // We can keep a short content block here if we want
    tags: ['steak', 'curated'],
  }
];

// --- 5. EXPORT ALL RECIPES ---
// Combine the auto-imported originals with the manually-defined curated ones.
export const allRecipes: Recipe[] = [...originalRecipes, ...curatedRecipes];
