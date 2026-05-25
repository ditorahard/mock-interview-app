import './App.css'
import { useState } from "react";
import { useProducts } from './hooks/useProducts';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useFilteredSortedProducts, type SortKey } from './hooks/useFilteredSortedProducts';

type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Backpack',
    price: 109.95,
    category: "men's clothing",
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'T-Shirt',
    price: 22.3,
    category: "men's clothing",
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Laptop',
    price: 999.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/150',
  },
]



export default function App() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortKey>('none');

  // Debounce the search term to avoid filtering on every keystroke
  const debouncedSearch = useDebouncedValue(search, 300);

  const filteredProducts = useFilteredSortedProducts(
    products,
    category,
    debouncedSearch,
    sortBy
  );

  return (
    <div className="container">
      <h1>Product Explorer</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <select
           value={category}
           onChange={(e) => {
             setCategory(e.target.value);
           }}
        >
          <option value="all">All</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="men's clothing">
            Men's Clothing
          </option>
        </select>

        <select
          aria-label="Sort products"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="none">Relevance</option>
          <option value="title-asc">Title (A→Z)</option>
          <option value="title-desc">Title (Z→A)</option>
          <option value="price-asc">Price (Low→High)</option>
          <option value="price-desc">Price (High→Low)</option>
        </select>
      </div>


      {loading && <p>Loading products...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((item) => {
            return (
              <div key={item.id} className="product-card">
                {item.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}