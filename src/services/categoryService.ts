import { Category } from '../types';

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${baseURL}/categories.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};
