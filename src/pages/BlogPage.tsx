import {useState, type ReactElement} from 'react';
import { PageWithSidebar, BlogPostCard, SearchBar } from '../components/Reusable';
import { Newspaper } from 'lucide-react';
import { blogPosts } from '../content/blogData';
import Fuse from 'fuse.js';
import { useFuseSearch } from '../hooks';

const fuse = new Fuse(blogPosts, {
  keys: ['title', 'summary', 'content'],
  threshold: 0.4,
  includeScore: true,
});

export default function BlogPage(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useFuseSearch(blogPosts, fuse, searchQuery);

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
      <div className="text-base  leading-relaxed mb-6">
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
          <BlogPostCard key={blogpost.slug} {...blogpost} />
        ))
      ) : (
        <div className="empty-state">
          <h3 className="text-2xl font-bold mb-4">No Posts Found</h3>
          <p className="text-lg ">No posts match the current search.</p>
        </div>
      )}
    </PageWithSidebar>
  );
}
