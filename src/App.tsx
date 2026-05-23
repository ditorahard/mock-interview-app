import './App.css'

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
  return (
    <div className="container">
      <h1>Product Explorer</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
        />

        <select>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">
            Men's Clothing
          </option>
        </select>
      </div>

      <div className="product-grid">
      </div>
    </div>
  )
}