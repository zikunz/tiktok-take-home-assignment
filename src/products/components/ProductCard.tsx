import React from 'react';
import { Button, Card } from 'antd';
import { useAtom } from 'jotai';
import { cartAtom } from '../../context/store';
import { FormattedMessage } from 'react-intl';

type ProductProps = {
  product: {
    product_id: string;
    name: string;
    price: number;
    category: string;
  };
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const [, setCart] = useAtom(cartAtom);

  const addToCart = () => {
    setCart((cart) => {
      const itemInCart = cart.find(
        (item) => item.product_id === product.product_id
      );
      if (itemInCart) {
        return cart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...cart, { product_id: product.product_id, quantity: 1 }];
      }
    });
  };

  return (
    <Card
      title={product.name}
      extra={
        <Button onClick={addToCart}>
          <FormattedMessage id="add" defaultMessage="Add" />
        </Button>
      }
    >
      <p>
        <FormattedMessage id="price" defaultMessage="Price" />: {product.price}
      </p>
    </Card>
  );
};

export default ProductCard;
