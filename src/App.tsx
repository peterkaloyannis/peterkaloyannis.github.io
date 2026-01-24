// src/App.tsx
import { useState, useEffect, type ReactElement } from 'react'
import type { AppRoute, AppRoutePage } from './types'; 

// Import Components
import Sidebar from './components/Sidebar';

// Import Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import RecipesPage from './pages/RecipesPage';
import CVPage from './pages/CVPage';
import BlogPostPage from './pages/BlogPostPage'; 
import RecipeDetailsPage from './pages/RecipeDetailsPage';

// Helper function to get the route (page + slug) from the URL hash
function getRouteFromHash(): AppRoute {
  const hash = window.location.hash.replace(/^#\/?/, ''); // e.g., "blog/my-post"
  const parts = hash.split('/');

  // Check for recipe details route: #/recipe-details/[slug]
  if (parts[0] === 'recipe-details' && parts.length > 1) {
    return { page: 'recipe-details', slug: parts[1] };
  }
  
  // Check for blog post route: #/blog/[slug]
  if (parts[0] === 'blog' && parts.length > 1) {
    return { page: 'blog-post', slug: parts[1] };
  }

  // Check for standard page routes
  let page: AppRoutePage = 'home';
  switch (parts[0]) {
    case 'projects':
      page = 'projects';
      break;
    case 'blog':
      page = 'blog';
      break;
    case 'recipes':
      page = 'recipes';
      break;
    case 'cv':
      page = 'cv';
      break;
    case 'home':
    default:
      page = 'home';
      break;
  }
  return { page, slug: null };
}

/**
 * Main Application Component
 * This is the root of your personal website.
 */
function App(): ReactElement {
  // State now holds the entire AppRoute object
  const [route, setRoute] = useState<AppRoute>(getRouteFromHash());

  // Effect to listen for URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    // Mobile: 'flex-col'. Desktop: 'flex-row'
    <div className="flex flex-col lg:flex-row min-h-screen font-sans">
      
      {/* Sidebar is responsive (sticky mobile, fixed desktop) */}
      <Sidebar currentPage={route.page} />

      {/* --- 2. Main Content Area --- */}
      <main className="flex-1 bg-amber-50 lg:pl-72">
        <div className="px-6 pt-8 pb-16 md:px-12">          
          {route.page === 'home' && <HomePage />}
          {route.page === 'projects' && <ProjectsPage />}
          {route.page === 'blog' && <BlogPage />}
          {route.page === 'recipes' && <RecipesPage />}
          {route.page === 'cv' && <CVPage />}
          
          {route.page === 'recipe-details' && route.slug && (
            <RecipeDetailsPage slug={route.slug} />
          )}
          {route.page === 'blog-post' && route.slug && (
            <BlogPostPage slug={route.slug} />
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
