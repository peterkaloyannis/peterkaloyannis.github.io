import {type ReactElement} from 'react';
import { blogPosts } from '../content/blogData';
import { MarkdownRenderer, NotFound } from '../components/Reusable';

interface BlogPostPageProps {
  slug: string;
}

// Helper to format date nicely
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // Ensure consistent date parsing
  });
}

export default function BlogPostPage({ slug }: BlogPostPageProps): ReactElement {
  // Find the correct post from the mock data using the slug
  const post = blogPosts.find((p) => p.slug === slug);

  // Show a not found message if the slug is invalid
  if (!post) {
    return <NotFound message="Post not found." backHref="#/blog" backLabel="Back to all posts" />;
  }

  // Render the post
  return (
    <section id="blog-post" className="max-w-5xl mx-auto">
      {/* Top Back Link */}
      <a 
        href="#/blog" 
        className="inline-block back-link mb-8"
      >
        &larr; Back to all posts
      </a>

      {/* Post Header */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{post.title}</h1>
      <p className="text-lg  mb-8">
        Published on {formatDate(post.date)}
      </p>

      {/* Post Content */}
      <div className="card-lg">
        <MarkdownRenderer content={post.content} />
      </div>

      {/* Bottom Back Link -- Include some extra top padding. */}
      <a 
        href="#/blog" 
        className="inline-block back-link mb-8 pt-6"
      >
        &larr; Back to all posts
      </a>
    </section>
  );
}
