import { useMemo } from 'react';
import type { Product } from '../types';

export type SortKey = 'none' | 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc';

export function useFilteredSortedProducts(
  products: Product[],
  category: string,
  search: string,
  sortBy: SortKey
) {
  return useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchCategory = category === 'all' || product.category === category;
      const matchSearch = q === '' || product.title.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });

    if (sortBy === 'none') return filtered;

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, category, search, sortBy]);
}
