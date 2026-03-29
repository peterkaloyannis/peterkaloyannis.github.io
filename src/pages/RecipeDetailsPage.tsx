import { MarkdownRenderer, RecipeMetadataPanel } from '../components/Reusable'; 
import { allRecipes } from '../content/recipeData'; 
import { type ReactElement } from 'react';

interface RecipeDetailsPageProps {
  slug: string;
}

export default function RecipeDetailsPage({ slug }: RecipeDetailsPageProps): ReactElement {
  // Find the specific recipe based on the URL slug
  const recipe = allRecipes.find(r => r.slug === slug);
  
  if (!recipe) {
    return (
      <div className="card-lg my-12 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">404 Recipe Not Found</h2>
        <p className="text-lg text-gray-700">The recipe you are looking for does not exist.</p>
        <a href="#/recipes" className="back-link mt-4 block">
          &larr; Back to all recipes
        </a>
      </div>
    );
  }

  const isCurated = recipe.type === 'curated';

  return (
    <section>
      <a href="#/recipes" className="inline-block back-link mb-8">
        &larr; Back to all recipes
      </a>

      {/* --- NEW: Two-Column Layout --- */}
      <div className="page-layout">

        {/* --- Column 1: Metadata (Sticky) --- */}
        <div className="page-sidebar">
          <div className="sticky top-8 space-y-8">
            <RecipeMetadataPanel {...recipe} />
          </div>
        </div>

        {/* --- Column 2: Content (Scrollable) --- */}
        <div className="flex-1 space-y-8">
          {/* Recipe Header Card */}
          <div className="card-lg">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{recipe.title}</h1>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <p>
                {isCurated ? 'Curated Recipe' : 'Original Creation'} 
                {recipe.sourceUrl && (
                  <a 
                    href={recipe.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    (View Source)
                  </a>
                )}
              </p>
              <p>Published: {recipe.date}</p>
            </div>
            <p className="text-lg italic text-gray-600">{recipe.summary}</p>
          </div>
          
          {/* Recipe Content Card */}
          <div className="card-lg">
            <MarkdownRenderer content={recipe.content} />
          </div>
        </div>

      </div>
    </section>
  );
}
