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
        <p className="text-lg ">The recipe you are looking for does not exist.</p>
        <a href="#/recipes" className="back-link mt-4 block">
          &larr; Back to all recipes
        </a>
      </div>
    );
  }

  return (
    <section>
      <a href="#/recipes" className="inline-block back-link mb-8">
        &larr; Back to all recipes
      </a>

      <h1 className="text-5xl font-extrabold mb-2">{recipe.title}</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Published on {recipe.date}
        {recipe.sourceUrl && (
          <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-2 link">
            (View Source)
          </a>
        )}
      </p>

      <div className="page-layout">

        {/* --- Column 1: Metadata (Sticky) --- */}
        <div className="page-sidebar">
          <div className="sticky top-8">
            <RecipeMetadataPanel {...recipe} />
          </div>
        </div>

        {/* --- Column 2: Content (Scrollable) --- */}
        <div className="flex-1">
          <div className="card-lg">
            <MarkdownRenderer content={recipe.content} />
          </div>
        </div>

      </div>
    </section>
  );
}
