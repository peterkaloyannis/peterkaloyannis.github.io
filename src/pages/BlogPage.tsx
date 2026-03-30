import {useState, type ReactElement} from 'react';
import { PageWithSidebar, BlogPostCard, SearchBar, CollapsibleText } from '../components/Reusable';
import { Newspaper } from 'lucide-react';
import { blogPosts } from '../content/blogData';
import Fuse from 'fuse.js';
import { useFuseSearch } from '../hooks';

const fuse = new Fuse(blogPosts, {
  keys: [
    { name: 'title',   weight: 3 },
    { name: 'summary', weight: 2 },
    { name: 'content', weight: 1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
});

export default function BlogPage(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [aboutOpen, setAboutOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const filteredBlogs = useFuseSearch(blogPosts, fuse, searchQuery);

  const sidebar = (
    <div className="card">
      <CollapsibleText title="Filters" isOpen={filtersOpen} onToggle={() => setFiltersOpen(o => !o)} className="">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Search the blog..."
        />
      </CollapsibleText>
      <CollapsibleText title="About this page" isOpen={aboutOpen} onToggle={() => setAboutOpen(o => !o)}>
        <div className="text-base leading-relaxed">
          I think most people who know me know that I have no shortage of
          things to say. I grew up in a household of loud and proud voices,
          always fighting for our airtime amongst one another.
          <br/><br/>
          This is the page where I wanna express my voice. I will try to post
          <ul className="list-disc pl-5 space-y-2">
            <li>Companions to articles to projects
              (inspired by the hilarious <a href="https://eieio.games/blog/" className="link">EIEIO</a>)</li>
            <li>Fun infographic articles
              (inspired by the amazing <a href="https://www.benjames.io/" className="link">Ben James</a>)</li>
            <li>Maybe, just maybe, an opinion or two.</li>
          </ul>
        </div>
      </CollapsibleText>
    </div>
  );

  return (
    <PageWithSidebar id="blog" icon={Newspaper} title="Blog" sidebar={sidebar}>
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blogpost) => (
            <BlogPostCard key={blogpost.slug} {...blogpost} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3 className="text-2xl font-bold mb-4">No Posts Found</h3>
          <p className="text-lg ">No posts match the current search.</p>
        </div>
      )}
    </PageWithSidebar>
  );
}
