import { Category } from '../types';

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch('/categories.json');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};
