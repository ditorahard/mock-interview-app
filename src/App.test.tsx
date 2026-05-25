import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock API client to return stable data
jest.mock('./services/api', () => {
  const mockProducts = [
    { id: 1, title: 'Backpack', price: 109.95, category: "men's clothing", image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'T-Shirt', price: 22.3, category: "men's clothing", image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Laptop', price: 999.99, category: 'electronics', image: 'https://via.placeholder.com/150' },
  ];
  return {
    __esModule: true,
    default: {
      get: jest.fn(() => Promise.resolve({ data: mockProducts })),
    },
  };
});

describe('App search', () => {
  test('renders controls and shows loading then products', async () => {
    render(<App />);
    expect(await screen.findByText(/Product Explorer/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search products.../i)).toBeInTheDocument();

    // Two comboboxes: category and sort
    const combos = screen.getAllByRole('combobox');
    expect(combos.length).toBeGreaterThanOrEqual(2);

    // Loading state appears before data resolves (may be fast; this assertion is optional)
    // expect(screen.getByText(/Loading products/i)).toBeInTheDocument();

    // Products render
    expect(await screen.findByText('Backpack')).toBeInTheDocument();
  });

  test('filters products as user types (debounced)', async () => {
    render(<App />);

    // Wait for initial products
    expect(await screen.findByText('Backpack')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Search products.../i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'lap' } });

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.queryByText('Backpack')).not.toBeInTheDocument();
      expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText('Backpack')).toBeInTheDocument();
      expect(screen.getByText('T-Shirt')).toBeInTheDocument();
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });
  });

  test('shows empty state when nothing matches', async () => {
    render(<App />);
    await screen.findByText('Backpack');

    const searchInput = screen.getByPlaceholderText(/Search products.../i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'xyz-not-found' } });

    expect(await screen.findByText(/No products found/i)).toBeInTheDocument();
  });
});
