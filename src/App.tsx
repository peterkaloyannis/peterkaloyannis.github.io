// src/App.tsx
import { type ReactElement, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';

// Import Components
import Sidebar from './components/Sidebar';
import { NotFound } from './components/Reusable';

// Import Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import RecipesPage from './pages/RecipesPage';
import CVPage from './pages/CVPage';
import BlogPostPage from './pages/BlogPostPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';

/**
 * Main Application Component
 */
function App(): ReactElement {
  const location = useLocation();

  // Scroll to top and update page title on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles: Record<string, string> = {
      '/':         "Peter Kaloyannis",
      '/projects': "Peter's Projects",
      '/blog':     "Peter's Blog",
      '/recipes':  "Peter's Recipes",
      '/cv':       "Peter's CV",
    };
    const base = '/' + location.pathname.split('/')[1];
    document.title = titles[base] ?? "The Peter Zone";
  }, [location.pathname]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 lg:pl-72">
        <div className="px-6 pt-8 pb-16 md:px-12">
          <Routes>
            <Route path="/"                   element={<HomePage />} />
            <Route path="/projects"           element={<ProjectsPage />} />
            <Route path="/blog"               element={<BlogPage />} />
            <Route path="/blog/:slug"         element={<BlogPostPage />} />
            <Route path="/recipes"            element={<RecipesPage />} />
            <Route path="/recipe-details/:slug" element={<RecipeDetailsPage />} />
            <Route path="/cv"                 element={<CVPage />} />
            <Route path="*"                   element={<NotFound message="Page not found." backHref="/" backLabel="Go home" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
