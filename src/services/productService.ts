import { Product } from '../types';

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${baseURL}/products.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
