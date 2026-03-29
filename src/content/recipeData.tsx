import type { Recipe } from '../types';
import { parseFrontMatter } from './parseFrontMatter';

// --- 1. PARSER ---
// Maps generic front matter fields to the Recipe interface.
const parseRecipeMarkdown = (rawMarkdown: string): { metadata: Partial<Recipe>; content: string } => {
  const { fields, content } = parseFrontMatter(rawMarkdown);
  const metadata: Partial<Recipe> = {};
  if (typeof fields['title'] === 'string') metadata.title = fields['title'];
  if (typeof fields['date'] === 'string') metadata.date = fields['date'];
  if (typeof fields['summary'] === 'string') metadata.summary = fields['summary'];
  if (typeof fields['serves'] === 'string') metadata.serves = fields['serves'];
  if (typeof fields['active cook time'] === 'string') metadata.activeCookTime = fields['active cook time'];
  if (typeof fields['total time'] === 'string') metadata.totalTime = fields['total time'];
  if (typeof fields['imageurl'] === 'string') metadata.imageUrl = fields['imageurl'];
  if (typeof fields['sourceurl'] === 'string') metadata.sourceUrl = fields['sourceurl'];
  if (Array.isArray(fields['tags'])) metadata.tags = fields['tags'] as string[];
  return { metadata, content };
};


// --- 2. IMPORT MARKDOWN FILES ---
const recipeModules = import.meta.glob('./recipes/*.md', { eager: true, query: 'raw' });


// --- 3. PROCESS ORIGINAL RECIPES ---
const originalRecipes: Recipe[] = Object.entries(recipeModules).map(([path, module]) => {
  // Get slug from filename: e.g., "./content/recipes/vegan-tiramisu.md" -> "vegan-tiramisu"
  const slug = path.split('/').pop()?.replace('.md', '') || 'unknown-slug';
  
  // The raw string is inside the 'default' property of the imported module
  const rawMarkdown = (module as { default: string }).default;
  
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
    tags: ['steak'],
  }
];

// --- 5. EXPORT ALL RECIPES ---
// Combine the auto-imported originals with the manually-defined curated ones.
export const allRecipes: Recipe[] = [...originalRecipes, ...curatedRecipes];
