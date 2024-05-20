import { Product } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('/products.json');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};