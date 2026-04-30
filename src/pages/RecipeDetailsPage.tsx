import { MarkdownRenderer, RecipeMetadataPanel, NotFound } from '../components/Reusable';
import { allRecipes } from '../content/recipeData';
import { type ReactElement } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RecipeDetailsPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const recipe = allRecipes.find(r => r.slug === slug);
  
  if (!recipe) {
    return (
      <NotFound message="Recipe not found." backHref="/recipes" backLabel="Back to all recipes" />
    );
  }

  return (
    <section>
      <Link to="/recipes" className="inline-block back-link mb-8">
        &larr; Back to all recipes
      </Link>

      <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{recipe.title}</h1>
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
