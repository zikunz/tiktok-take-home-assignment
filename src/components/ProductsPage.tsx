import React from 'react';
import CategoryTabs from './CategoryTabs';
import ProductList from './ProductList';

const ProductsPage: React.FC = () => (
  <div>
    <h1>Products Page</h1>
    <CategoryTabs />
    <ProductList />
  </div>
);

export default ProductsPage;
