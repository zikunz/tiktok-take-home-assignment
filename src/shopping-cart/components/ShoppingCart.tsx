import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../context/store';
import { Table, Button, InputNumber, Typography, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useIntl, FormattedMessage } from 'react-intl';
import { getProducts } from '../../services/productService';
import { Product } from '../../types';

const { Text } = Typography;

const MAX_QUANTITY = 100000;

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [products, setProducts] = useState<Product[]>([]);
  const intl = useIntl();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: (error as Error).message,
          placement: 'topRight',
        });
      }
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY) {
      notification.error({
        message: intl.formatMessage({ id: 'error' }),
        description: intl.formatMessage({ id: 'maxQuantityExceeded' }),
        placement: 'topRight',
      });
      setCart((cart) =>
        cart.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: MAX_QUANTITY }
            : item
        )
      );
    } else {
      setCart((cart) =>
        cart.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleDelete = (productId: string) => {
    setCart((cart) => cart.filter((item) => item.product_id !== productId));
  };

  const getProduct = (productId: string) => {
    return products.find((product) => product.product_id === productId);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = getProduct(item.product_id);
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  const handleConfirm = () => {
    if (cart.length === 0) {
      notification.warning({
        message: intl.formatMessage({ id: 'emptyCartMessage' }),
        description: intl.formatMessage({ id: 'emptyCartDescription' }),
        placement: 'topRight',
      });
    } else {
      setCart([]);
      notification.success({
        message: intl.formatMessage({ id: 'orderSuccessMessage' }),
        description: intl.formatMessage({ id: 'orderSuccessDescription' }),
        placement: 'topRight',
      });
    }
  };

  const columns = [
    {
      title: <FormattedMessage id="name" />,
      dataIndex: 'product_id',
      key: 'name',
      render: (productId: string) => {
        const product = getProduct(productId);
        return product ? product.name : 'Product not found';
      },
    },
    {
      title: <FormattedMessage id="price" />,
      dataIndex: 'product_id',
      key: 'price',
      render: (productId: string) => {
        const product = getProduct(productId);
        return product ? `¥${product.price}` : 'N/A';
      },
    },
    {
      title: <FormattedMessage id="quantity" />,
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: { product_id: string }) => (
        <InputNumber
          min={1}
          max={Number.MAX_SAFE_INTEGER}
          value={quantity}
          onChange={(value) =>
            handleQuantityChange(record.product_id, value as number)
          }
        />
      ),
    },
    {
      title: <FormattedMessage id="action" />,
      key: 'action',
      render: (text: any, record: { product_id: string }) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.product_id)}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={cart}
        columns={columns}
        rowKey="product_id"
        pagination={false}
        locale={{ emptyText: <FormattedMessage id="noData" /> }}
      />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Text strong style={{ marginRight: '20px' }}>
          <FormattedMessage id="total" />: ¥{getTotalPrice()}
        </Text>
        <Button type="primary" onClick={handleConfirm}>
          <FormattedMessage id="confirm" />
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
