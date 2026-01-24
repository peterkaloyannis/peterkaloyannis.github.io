import React from 'react';
import { blogPosts } from '../content/blogData'; // Import mock data
import { MarkdownRenderer } from '../components/Reusable';

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

export default function BlogPostPage({ slug }: BlogPostPageProps): JSX.Element {
  // Find the correct post from the mock data using the slug
  const post = blogPosts.find((p) => p.slug === slug);

  // Show a not found message if the slug is invalid
  if (!post) {
    return (
      <section id="blog-post-not-found">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-lg text-gray-700 mb-8">
          Sorry, we couldn't find the post you were looking for.
        </p>
        <a 
          href="#/blog" 
          className="font-medium text-indigo-700 hover:underline"
        >
          &larr; Back to all posts
        </a>
      </section>
    );
  }

  // Render the post
  return (
    <section id="blog-post" className="max-w-5xl mx-auto">
      {/* Back Link */}
      <a 
        href="#/blog" 
        className="inline-block font-medium text-indigo-700 hover:underline mb-8"
      >
        &larr; Back to all posts
      </a>

      {/* Post Header */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-lg text-gray-500 mb-8">
        Published on {formatDate(post.date)}
      </p>

      {/* Post Content */}
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <MarkdownRenderer content={post.content} />
      </div>
    </section>
  );
}
