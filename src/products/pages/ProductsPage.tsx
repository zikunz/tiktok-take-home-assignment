import React from 'react';
import ProductList from '../components/ProductList';
import CategoryTabs from '../components/CategoryTabs';
import { Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

const { Title } = Typography;

const ProductsPage: React.FC = () => (
  <div>
    <Title><FormattedMessage id="productsPage" /></Title>
    <CategoryTabs />
    <ProductList />
  </div>
);

export default ProductsPage;
