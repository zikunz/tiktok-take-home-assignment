import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ProductsPage from './pages/ProductsPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

const { Header, Content } = Layout;

const App: React.FC = () => (
  <Router>
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            <Link to="/shopping-cart">Shopping Cart</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px'}}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/" element={<ProductsPage />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  </Router>
);

export default App;
