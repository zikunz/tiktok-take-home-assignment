import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../context/store';
import { Table, Button, InputNumber, Typography, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useAtom(cartAtom);

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
        message: '购物车是空的',
        description: '去挑一些你喜欢的商品吧。',
        placement: 'topRight',
      });
    } else {
      setCart([]);
      notification.success({
        message: '下单成功',
        description: '感谢您选择抖音电商！',
        placement: 'topRight',
      });
    }
  };

  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '产品单价',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price}`,
    },
    {
      title: '产品数量',
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
      title: '操作',
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
      <Table dataSource={cart} columns={columns} rowKey="product_id" pagination={false} />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Text strong style={{ marginRight: '20px' }}>总计: ¥{getTotalPrice()}</Text>
        <Button type="primary" onClick={handleConfirm}>
          确认
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
