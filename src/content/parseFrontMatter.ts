/**
 * parseFrontMatter
 *
 * Extracts YAML-style front matter from a markdown string and returns the raw
 * key-value pairs together with the remaining body content.
 *
 * Supports scalar values (string) and simple list values (YAML block sequences
 * using "- item" notation).  The caller is responsible for mapping the generic
 * record to its own typed interface.
 */
export function parseFrontMatter(rawMarkdown: string): {
  fields: Record<string, string | string[]>;
  content: string;
} {
  const fields: Record<string, string | string[]> = {};
  const match = rawMarkdown.match(/---\n([\s\S]*?)\n---/);

  if (!match) {
    return { fields, content: rawMarkdown };
  }

  const frontMatter = match[1];
  let currentListKey: string | null = null;

  frontMatter.split('\n').forEach(line => {
    // Continue collecting list items for the current key.
    if (currentListKey !== null) {
      const itemMatch = line.match(/^\s*-\s*(.*)/);
      if (itemMatch) {
        (fields[currentListKey] as string[]).push(itemMatch[1].trim());
        return;
      } else {
        currentListKey = null;
      }
    }

    // Match a scalar key: value pair.
    const kvMatch = line.match(/^\s*([^:]+):\s*(.*)/);
    if (!kvMatch) return;

    const key = kvMatch[1].trim();
    const value = kvMatch[2].trim().replace(/^["']|["']$/g, '');

    if (value === '') {
      // Empty value after the colon — treat as the start of a list block.
      fields[key] = [];
      currentListKey = key;
    } else {
      fields[key] = value;
    }
  });

  const content = rawMarkdown.replace(/---\n([\s\S]*?)\n---/, '').trim();
  return { fields, content };
}
