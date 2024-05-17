import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ProductsPage from './pages/ProductsPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import TikTokLogo from './assets/TikTok.png';

const { Header, Content, Footer } = Layout;

const CustomHeader: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname === '/' ? '/products' : location.pathname;

  return (
    <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#001529', padding: '0' }}>
      <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={TikTokLogo} alt="TikTok Logo" style={{ width: '80px', height: 'auto' }} />
      </a>
      <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} style={{ flex: 1 }}>
        <Menu.Item key="/products" icon={<AppstoreOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="/shopping-cart" icon={<ShoppingCartOutlined />}>
          <Link to="/shopping-cart">Shopping Cart</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

const App: React.FC = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <CustomHeader />
      <Content style={{ padding: '0 80px', backgroundColor: '#f0f2f5', flex: 1 }}>
        <div className="site-layout-content" style={{ height: '100%' }}>
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/" element={<ProductsPage />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>抖音电商 ©2024 Created by TikTok</Footer>
    </Layout>
  </Router>
);

export default App;
