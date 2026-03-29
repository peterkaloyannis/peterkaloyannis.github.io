import { useState, useMemo, type ReactElement } from 'react';
import Fuse from 'fuse.js';
import { PageWithSidebar, RecipeCard, SearchBar, ToggleSwitch } from '../components/Reusable';
import { BookOpen } from 'lucide-react';
import { allRecipes } from '../content/recipeData';
import type { Recipe } from '../types';
import { useFuseSearch } from '../hooks';

const fuse = new Fuse(allRecipes, {
  keys: ['title', 'summary', 'tags', 'content'],
  threshold: 0.4,
  includeScore: true,
});

const allTags = [
  ...new Set(allRecipes.flatMap(recipe => recipe.tags || []))
].sort();

export default function RecipesPage(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOriginal, setShowOriginal] = useState(true);
  const [showCurated, setShowCurated] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const searchResults = useFuseSearch(allRecipes, fuse, searchQuery);

  const filteredRecipes: Recipe[] = useMemo(() => {
    const typeFiltered = searchResults.filter(recipe =>
      (recipe.type === 'original' && showOriginal) ||
      (recipe.type === 'curated' && showCurated)
    );

    if (selectedTags.length === 0) return typeFiltered;

    return typeFiltered.filter(recipe =>
      selectedTags.every(tag => recipe.tags?.includes(tag))
    );
  }, [searchResults, showOriginal, showCurated, selectedTags]);

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

  const sidebar = (
    <div className="card">
      <h3 className="panel-heading">Filters</h3>
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes (e.g., 'vegan', 'steak')..."
        />
      </div>
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
      <div>
        <h4 className="font-medium  mb-3 mt-3">Tags</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTagClick(null)}
            className={`tag-btn ${selectedTags.length === 0 ? 'tag-btn-active' : 'tag-btn-inactive'}`}
          >
            All Tags
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag-btn ${selectedTags.includes(tag) ? 'tag-btn-active' : 'tag-btn-inactive'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-6 border-gray-200" />
      <h3 className="panel-heading">About this page</h3>
      <p className="text-base  leading-relaxed mb-6">
        Cooking is the primary way I express love for myself and others.
        Making this page was probably my number one motivation for building
        this website!
        <br/><br/>
        In this list, I provide some of my own recipes and the stories
        behind them. I also link some of my favorite external recipes!
      </p>
    </div>
  );

  return (
    <PageWithSidebar id="recipes" icon={BookOpen} title="Recipes" sidebar={sidebar}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} {...recipe} />
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 empty-state">
            <h3 className="text-2xl font-bold  mb-4">No Recipes Found</h3>
            <p className="text-lg ">No recipes match the current filters.</p>
          </div>
        )}
      </div>
    </PageWithSidebar>
  );
}
