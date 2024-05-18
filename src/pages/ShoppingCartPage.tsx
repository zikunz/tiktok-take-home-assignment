import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

const { Title } = Typography;

const ShoppingCartPage: React.FC = () => (
  <div>
    <Title><FormattedMessage id="shoppingCartPage" /></Title>
    <ShoppingCart />
  </div>
);

export default ShoppingCartPage;
