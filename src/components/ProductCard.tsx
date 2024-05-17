import React from 'react';
import { Button, Card } from 'antd';
import { useAtom } from 'jotai';
import { cartAtom } from '../context/store';

type ProductProps = {
  product: {
    product_id: string;
    name: string;
    price: number;
    category: string;
  }
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const [, setCart] = useAtom(cartAtom);

  const addToCart = () => {
    setCart(cart => {
      const itemInCart = cart.find(item => item.product_id === product.product_id);
      if (itemInCart) {
        return cart.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...cart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Card title={product.name} extra={<Button onClick={addToCart}>Add</Button>}>
      <p>Price: {product.price}</p>
    </Card>
  );
};

export default ProductCard;
