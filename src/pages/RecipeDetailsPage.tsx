import { MarkdownRenderer, RecipeMetadataPanel } from '../components/Reusable'; 
import { BookOpen } from '../components/Icons';
import { allRecipes } from '../content/recipeData'; 

interface RecipeDetailsPageProps {
  slug: string;
}

export default function RecipeDetailsPage({ slug }: RecipeDetailsPageProps): JSX.Element {
  // Find the specific recipe based on the URL slug
  const recipe = allRecipes.find(r => r.slug === slug);
  
  if (!recipe) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-xl my-12 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">404 Recipe Not Found</h2>
        <p className="text-lg text-gray-700">The recipe you are looking for does not exist.</p>
        <a href="#/recipes" className="text-indigo-600 hover:text-indigo-800 mt-4 block">
          &larr; Back to all recipes
        </a>
      </div>
    );
  }

  const isCurated = recipe.type === 'curated';

  return (
    <section>
      <div className="flex items-center space-x-4 mb-8">
        <BookOpen className="w-8 h-8 text-gray-900" />
        <a href="#/recipes" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          &larr; Back to all recipes
        </a>
      </div>

      {/* --- NEW: Two-Column Layout --- */}
      <div className="flex flex-col md:flex-row gap-12">

        {/* --- Column 1: Metadata (Sticky) --- */}
        <div className="md:w-[350px] flex-shrink-0">
          <div className="sticky top-8 space-y-8">
            <RecipeMetadataPanel 
                serves={recipe.serves}
                activeCookTime={recipe.activeCookTime}
                totalTime={recipe.totalTime}
                tags={recipe.tags}
                type={recipe.type}
                imageUrl={recipe.imageUrl}
            />
          </div>
        </div>

        {/* --- Column 2: Content (Scrollable) --- */}
        <div className="flex-1 space-y-8">
          {/* Recipe Header Card */}
          <div className="bg-white p-8 rounded-lg shadow-xl">
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
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <MarkdownRenderer content={recipe.content} />
          </div>
        </div>

      </div>
    </section>
  );
}
