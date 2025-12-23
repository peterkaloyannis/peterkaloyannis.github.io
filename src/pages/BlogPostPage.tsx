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

/**
 * A simple parser to handle newlines and code blocks.
 * For a real blog, you'd use a Markdown library like 'react-markdown'.
 */
function PostContent({ content }: { content: string }) {
  // Split the content by code blocks
  const parts = content.split(/(\`\`\`typescript[\s\S]*?\`\`\`)/g);

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl text-lg text-gray-800 leading-relaxed">
      {parts.map((part, index) => {
        // Check if the part is a code block
        if (part.startsWith('```typescript')) {
          // Extract the code, removing the ``` markers
          const code = part.replace(/^```typescript\n|```$/g, '');
          return (
            <pre 
              key={index}
              className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm"
            >
              <code>{code.trim()}</code>
            </pre>
          );
        }
        
        // It's a regular text part.
        // We use 'whitespace-pre-wrap' to respect newlines.
        return (
          <p key={index} className="whitespace-pre-wrap mb-4">
            {part}
          </p>
        );
      })}
    </div>
  );
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
    <section id="blog-post">
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
