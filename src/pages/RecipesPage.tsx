import { useState, useMemo } from 'react'; 
import Fuse from 'fuse.js'; 
import { SectionTitle, RecipeCard, SearchBar, ToggleSwitch } from '../components/Reusable'; 
import { BookOpen } from '../components/Icons';
import { allRecipes } from '../content/recipeData'; 
import type { Recipe } from '../types'; 

// --- FUSE.JS CONFIG ---
const fuseOptions = {
  keys: [ 'title', 'summary', 'tags', 'content' ],
  threshold: 0.4, 
  includeScore: true,
};
const fuse = new Fuse(allRecipes, fuseOptions);

// --- 1. GET ALL UNIQUE TAGS ---
const allTags = [
  ...new Set(allRecipes.flatMap(recipe => recipe.tags || []))
].sort();

export default function RecipesPage(): JSX.Element {
  
  // --- 2. STATE MANAGEMENT ---
  const [searchQuery, setSearchQuery] = useState('');
  const [showOriginal, setShowOriginal] = useState(true);
  const [showCurated, setShowCurated] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  
  // --- 3. FILTERING LOGIC ---
  const filteredRecipes: Recipe[] = useMemo(() => {
    
    // Step 1: Filter by search query
    const searchResults = !searchQuery.trim()
      ? allRecipes 
      : fuse.search(searchQuery).map(result => result.item); 
    
    // Step 2: Filter by type (Original/Curated)
    const typeFiltered = searchResults.filter(recipe => {
      if (recipe.type === 'original') return showOriginal;
      if (recipe.type === 'curated') return showCurated;
      return false; 
    });

    // Step 3: Filter by selected tags (OR logic)
    if (selectedTags.length === 0) {
      return typeFiltered; // If no tags are selected, return all
    }
    
    return typeFiltered.filter(recipe => 
      recipe.tags?.some(tag => selectedTags.includes(tag))
    );

  }, [searchQuery, showOriginal, showCurated, selectedTags]); // Dependency array


  // --- 4. Click Handler for Tags ---
  const handleTagClick = (tag: string | null) => {
    if (tag === null) {
      setSelectedTags([]);
      return;
    }
    if (selectedTags.includes(tag)) {
      setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
    } else {
      setSelectedTags(prevTags => [...prevTags, tag]);
    }
  };


  // --- 5. RENDER (JSX) ---
  
  // Helper classes for tag button styling
  const baseTagClass = "text-xs font-medium px-3 py-1 rounded-full cursor-pointer transition-colors";
  const activeTagClass = "bg-indigo-600 text-white";
  const inactiveTagClass = "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <section id="recipes">
      <SectionTitle icon={BookOpen} title="Recipes" />
      {/* --- Two-Column Layout --- */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* --- Column 1: Filter Panel (Sticky) --- */}
        <div className="md:w-[350px] flex-shrink-0">
          <div className="sticky top-8">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

              {/* Search Bar */}
              <div className="mb-6">
                <SearchBar 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes (e.g., 'vegan', 'steak')..."
                />
              </div>

              {/* Type Toggles */}
              <div className="space-y-4">
                <ToggleSwitch
                  id="show-original"
                  label="Show Original"
                  isEnabled={showOriginal}
                  onToggle={() => setShowOriginal(!showOriginal)}
                />
                <ToggleSwitch
                  id="show-curated"
                  label="Show Curated"
                  isEnabled={showCurated}
                  onToggle={() => setShowCurated(!showCurated)}
                />
              </div>

              {/* Tag Filter Section */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 mt-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {/* "All" Button */}
                  <button
                    onClick={() => handleTagClick(null)} 
                    className={`
                      ${baseTagClass} 
                      ${selectedTags.length === 0 ? activeTagClass : inactiveTagClass}
                    `}
                  >
                    All Tags
                  </button>

                  {/* Dynamic Tag Buttons */}
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)} 
                      className={`
                        ${baseTagClass}
                        ${selectedTags.includes(tag) ? activeTagClass : inactiveTagClass}
                      `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="my-6 border-gray-200" />
              <h3 className="text-lg font-bold text-gray-900 mb-4">About this page</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                Growing up, my mother made sure that I always ate well.
                As she cooked meals, she expressed how much she cared for
                her family. She made sure me and my siblings participated
                in that expression; passing on a tradition of love and care
                through taste, aroma and texture. I am sure she learned those
                very traditions from her own mother, and I hope to pass them along 
                someday too.<br/><br/>

                Cooking is a primary way I express myself. In this list, I
                provide some of my own recipes and the stories behind them.
                I also link some of my favorite external recipes! Making this
                page was probably my number one must have for this website!
              </p>
            </div>
          </div>
        </div>

        {/* --- Column 2: Recipe Grid (Scrollable) --- */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.slug}
                  slug={recipe.slug}
                  type={recipe.type}
                  title={recipe.title}
                  date={recipe.date}
                  summary={recipe.summary}
                  serves={recipe.serves}
                  tags={recipe.tags}
                  imageUrl={recipe.imageUrl}
                  sourceUrl={recipe.sourceUrl}
                />
              ))
            ) : (
              // Updated empty state
              <div className="md:col-span-2 lg:col-span-3 bg-white p-8 rounded-lg shadow-xl text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Recipes Found</h3>
                <p className="text-lg text-gray-700">
                  No recipes match the current filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
