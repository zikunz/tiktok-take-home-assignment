import React from 'react';
import { Button, Card, notification } from 'antd';
import { useAtom } from 'jotai';
import { cartAtom } from '../../context/store';
import { FormattedMessage, useIntl } from 'react-intl';

const MAX_QUANTITY = 100000;

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
  const intl = useIntl();

  const addToCart = () => {
    setCart((cart) => {
      const itemInCart = cart.find(
        (item) => item.product_id === product.product_id
      );
      if (itemInCart) {
        if (itemInCart.quantity >= MAX_QUANTITY) {
          notification.error({
            message: intl.formatMessage({ id: 'error' }),
            description: intl.formatMessage({ id: 'maxQuantityError' }),
            placement: 'topRight',
          });
          return cart;
        }
        return cart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
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
