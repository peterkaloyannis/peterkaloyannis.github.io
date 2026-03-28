import {useState, useMemo, type ReactElement} from 'react';
import { PageWithSidebar, BlogPostCard, SearchBar } from '../components/Reusable';
import { Newspaper } from '../components/Icons';
import { blogPosts } from '../content/blogData';
import Fuse from 'fuse.js';
import type { BlogPost } from '../types';

const fuseOptions = {
  keys: [ 'title', 'summary', 'content' ],
  threshold: 0.4,
  includeScore: true,
};
const fuse = new Fuse(blogPosts, fuseOptions);

export default function BlogPage(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs: BlogPost[] = useMemo(() => {
    const searchResults = !searchQuery.trim()
      ? blogPosts
      : fuse.search(searchQuery).map(result => result.item);
    return searchResults;
  }, [searchQuery]);

  const sidebar = (
    <div className="card">
      <h3 className="panel-heading">Filters</h3>
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search the blog..."
        />
      </div>
      <hr className="my-6 border-gray-200" />
      <h3 className="panel-heading">About this page</h3>
      <div className="text-base text-gray-700 leading-relaxed mb-6">
        I think most people who know me know that I have no shortage of
        things to say. I grew up in a household of loud and proud voices,
        always fighting for our airtime amongst one another.
        <br/><br/>
        This is the page where I wanna express my voice. I will try to post
        <ul className="list-disc pl-5 space-y-2">
          <li>Companions to articles to projects
            (inspired by the hilarious <a href="https://eieio.games/blog/" className="text-blue-700">EIEIO</a>)</li>
          <li>Fun infographic articles
            (inspired by the amazing <a href="https://www.benjames.io/" className="text-blue-700">Ben James</a>)</li>
          <li>Maybe, just maybe, an opinion or two.</li>
        </ul>
      </div>
    </div>
  );

  return (
    <PageWithSidebar id="blog" icon={Newspaper} title="Blog" sidebar={sidebar}>
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
        <div className="empty-state">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Posts Found</h3>
          <p className="text-lg text-gray-700">No posts match the current search.</p>
        </div>
      )}
    </PageWithSidebar>
  );
}
