import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../context/store';
import { notification } from 'antd';
import { getProducts } from '../../services/productService';
import ProductCard from './ProductCard';
import { atom } from 'jotai';

const productsAtom = atom<any[]>([]); // Define atom here or export it from store

const ProductList: React.FC = () => {
  const [products, setProducts] = useAtom(productsAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          notification.error({
            message: 'Error',
            description: error.message,
            placement: 'topRight',
          });
        }
      }
    };

    fetchProducts();
  }, [setProducts]);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div>
      {filteredProducts.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
