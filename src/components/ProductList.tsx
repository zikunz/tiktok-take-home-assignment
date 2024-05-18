import React from 'react';
import { useAtom } from 'jotai';
import { productsAtom, selectedCategoryAtom } from '../context/store';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const [products] = useAtom(productsAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
