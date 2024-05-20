import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../context/store';
import { Table, Button, InputNumber, Typography, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useIntl, FormattedMessage } from 'react-intl';

const { Text } = Typography;

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const intl = useIntl();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setCart(cart =>
      cart.map(item =>
        item.product_id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDelete = (productId: string) => {
    setCart(cart => cart.filter(item => item.product_id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage id="price" />,
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price}`,
    },
    {
      title: <FormattedMessage id="quantity" />,
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any, record: any) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.product_id, value as number)}
        />
      ),
    },
    {
      title: <FormattedMessage id="action" />,
      key: 'action',
      render: (text: any, record: any) => (
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
