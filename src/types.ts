// Defines the "page" part of our route
export type AppRoutePage = 
    'home' 
    | 'projects' 
    | 'blog' 
    | 'recipes' // Recipes list page
    | 'recipe-details' // New: Single recipe page
    | 'cv' 
    | 'blog-post';

// Define the structure for a single blog post
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string; 
}

// Defines the structure for a single recipe
export interface Recipe {
  slug: string;
  type: 'original' | 'curated'; // New field for filtering
  title: string;
  date: string;
  summary: string;
  sourceUrl?: string; // Optional URL for curated recipes
  imageUrl?: string;
  serves?: string;
  activeCookTime?: string;
  totalTime?: string;
  tags?: string[];
  content: string; // The markdown content
}

// Defines the complete route, including a potential slug for blog/recipe posts
export interface AppRoute {
  page: AppRoutePage;
  slug: string | null;
}
