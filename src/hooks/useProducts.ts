import { useEffect, useState } from 'react';
//@ts-expect-error - This is js
import api from '../services/api';
import type { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api
      .get('/products')
      .then((response: { data: Product[] }) => {
        if (!mounted) return;
        setProducts(response?.data ?? []);
      })
      .catch(() => {
        if (!mounted) return;
        setError('Failed to load products');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error };
}
