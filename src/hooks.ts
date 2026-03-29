import { useMemo } from 'react';
import Fuse from 'fuse.js';

/**
 * useFuseSearch
 * Returns the subset of `items` matching `query` via Fuse.js fuzzy search.
 * When the query is blank, returns the full list unchanged.
 */
export function useFuseSearch<T>(items: T[], fuse: Fuse<T>, query: string): T[] {
  return useMemo(() => {
    if (!query.trim()) return items;
    return fuse.search(query).map(result => result.item);
  }, [items, fuse, query]);
}
