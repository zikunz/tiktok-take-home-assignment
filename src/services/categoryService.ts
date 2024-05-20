export const getCategories = async () => {
    const response = await fetch('/categories.json');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  };
  