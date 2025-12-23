import {useState, useMemo} from 'react';
// Import the new card component
import { SectionTitle, BlogPostCard, SearchBar } from '../components/Reusable'; 
import { Newspaper } from '../components/Icons';
import { blogPosts } from '../content/blogData'; // Import your mock data
import Fuse from 'fuse.js'; 
import type { BlogPost } from '../types';

const fuseOptions = {
  keys: [ 'title', 'summary', 'content' ],
  threshold: 0.4, 
  includeScore: true,
};
const fuse = new Fuse(blogPosts, fuseOptions);

export default function BlogPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs: BlogPost[] = useMemo(() => {
    // Step 1: Filter by search query
    const searchResults = !searchQuery.trim()
      ? blogPosts 
      : fuse.search(searchQuery).map(result => result.item); 
    return searchResults;
  }, [searchQuery]); // Dependency array

  return (
    <section id="blog">
      <SectionTitle icon={Newspaper} title="Blog" />
      
      {/* Container for all the post cards */}
      <div className="flex flex-col md:flex-row gap-12">
         <div className="md:w-[350px] flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-xl sticky top-8">            
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes (e.g., 'vegan', 'steak')..."
              />
            </div>
            {/* Divider */}
            <hr className="my-6 border-gray-200" />
            <h3 className="text-lg font-bold text-gray-900 mb-4">About this page</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              I think most people who know me (or any of my relatives) 
              know that I (we) have no shortage of things to say. I grew up
              in a household of loud and proud voices, always fighting for 
              our airtime amongst one another. It is always quite the 
              experience bringing a friend in to a family dinner. They
              often admit that after seeing the environment I grew up in,
              my candid but opinonated character seems a natural outcome.
              <br/><br/>
              This is the page where I wanna express my voice. I wanna post
              <ul className="list-disc pl-5 space-y-2">
                <li>Companions to articles to projects
                  (inspired by the hilarious <a href="https://eieio.games/blog/" className="text-blue-700">EIEIO</a>)</li>
                <li>Fun infographic articles 
                  (inspired by the amazing <a href="https://www.benjames.io/" className="text-blue-700">Ben James</a>)</li>
                <li>Niche technical articles
                  (inspired by the live saving TODO) </li>
                <li>Maybe, just maybe, an opinion or two.</li>
              </ul>
            </p>
          </div>
        </div>

        {/* Scrollable section. */}
        <div className="flex-1">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blogpost) => (
                <BlogPostCard 
                  key={blogpost.slug}
                  slug={blogpost.slug}
                  title={blogpost.title}
                  date={blogpost.date}
                  summary={blogpost.summary}
                />
              ))
            ) : (
              // Updated empty state
              <div className="md:col-span-2 lg:col-span-3 bg-white p-8 rounded-lg shadow-xl text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No blogs Found</h3>
                <p className="text-lg text-gray-700">
                  No blogs match the current filters.
                </p>
              </div>
            )}
          </div>

      </div>
    </section>
  );
}
