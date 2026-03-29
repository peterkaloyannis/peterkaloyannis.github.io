import type { Recipe } from '../types';
import { parseFrontMatter } from './parseFrontMatter';

// --- 1. PARSER ---
// Maps generic front matter fields to the Recipe interface.
const parseRecipeMarkdown = (rawMarkdown: string): { metadata: Partial<Recipe>; content: string } => {
  const { fields, content } = parseFrontMatter(rawMarkdown);
  const str = (key: string) => typeof fields[key] === 'string' ? fields[key] as string : undefined;
  const metadata: Partial<Recipe> = {
    title:   str('title'),
    date:    str('date'),
    summary: str('summary'),
    serves:  str('serves'),
    activeTime: str('activeTime'),
    totalTime:  str('totalTime'),
    imageUrl:   str('imageUrl'),
    sourceUrl:  str('sourceUrl'),
    tags:         Array.isArray(fields['tags']) ? fields['tags'] as string[] : undefined,
  };
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
    slug: 'tiramisu',
    type: 'curated',
    title: 'Tiramisu',
    date: '12-18-2024',
    summary: 'This tiramisu recipe is incredible and beats most restaurants at their game!',
    sourceUrl: 'https://www.youtube.com/watch?v=o3AMALUTp8o',
    imageUrl: "https://img.youtube.com/vi/o3AMALUTp8o/mqdefault.jpg",
    content: "",
    tags: ['coffee', 'dessert', 'cake'],
  },
  {
    slug: 'tres-leches',
    type: 'curated',
    title: 'Tres Leches',
    date: '08-24-2025',
    summary: 'God tier tres leches. Everyone will love you more afterwards.',
    sourceUrl: 'https://www.youtube.com/watch?v=_PH4eN0HG3o',
    imageUrl: "https://img.youtube.com/vi/_PH4eN0HG3o/mqdefault.jpg",
    content: "",
    tags: ['cake', 'dessert'],
  },
];

// --- 5. EXPORT ALL RECIPES ---
// Combine the auto-imported originals with the manually-defined curated ones.
export const allRecipes: Recipe[] = [...originalRecipes, ...curatedRecipes];
