import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ProductsPage from './pages/ProductsPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import TikTokLogo from './assets/TikTok.png';

const { Header, Content } = Layout;

const App: React.FC = () => (
  <Router>
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 0' }}>
        <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={TikTokLogo} alt="TikTok Logo" style={{ width: '80px', height: 'auto' }} />
        </a>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            <Link to="/shopping-cart">Shopping Cart</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 80px', backgroundColor: '#f0f2f5' }}>
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
