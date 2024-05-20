import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { Layout, Menu, Button, Space, ConfigProvider } from 'antd';
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  GithubOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import ProductsPage from './products/pages/ProductsPage';
import ShoppingCartPage from './shopping-cart/pages/ShoppingCartPage';
import TikTokLogo from './assets/TikTok.png';
import { IntlProvider, FormattedMessage } from 'react-intl';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import messages from './locales';
import ErrorBoundary from './error-handling/ErrorBoundary';

const { Header, Content, Footer } = Layout;

const CustomHeader: React.FC<{
  locale: string;
  changeLocale: (locale: string) => void;
}> = ({ locale, changeLocale }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = location.pathname.replace(`/${locale}`, `/${newLocale}`);
    navigate(newPath);
    changeLocale(newLocale);
  };

  const selectedKey = location.pathname.split('/').slice(2).join('/');

  const menuItems = [
    {
      key: `/${locale}/products`,
      icon: <AppstoreOutlined />,
      label: (
        <Link to={`/${locale}/products`}>
          <FormattedMessage id="products" />
        </Link>
      ),
    },
    {
      key: `/${locale}/shopping-cart`,
      icon: <ShoppingCartOutlined />,
      label: (
        <Link to={`/${locale}/shopping-cart`}>
          <FormattedMessage id="shoppingCart" />
        </Link>
      ),
    },
  ];

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#001529',
        padding: '0',
      }}
    >
      <a
        href="https://www.tiktok.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          src={TikTokLogo}
          alt="TikTok Logo"
          style={{ width: '80px', height: 'auto' }}
        />
      </a>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[`/${locale}/${selectedKey}`]}
        style={{ flex: 1 }}
        items={menuItems}
      />
      <Space style={{ marginLeft: 'auto', marginRight: '20px' }}>
        <Button
          type={locale === 'en' ? 'primary' : 'default'}
          onClick={() => handleLocaleChange('en')}
        >
          English
        </Button>
        <Button
          type={locale === 'zh' ? 'primary' : 'default'}
          onClick={() => handleLocaleChange('zh')}
        >
          中文
        </Button>
      </Space>
    </Header>
  );
};

const AppContent: React.FC<{
  locale: string;
  changeLocale: (locale: string) => void;
}> = ({ locale, changeLocale }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CustomHeader locale={locale} changeLocale={changeLocale} />
      <Content
        style={{ padding: '0 80px', backgroundColor: '#f0f2f5', flex: 1 }}
      >
        <div className="site-layout-content" style={{ height: '100%' }}>
          <Routes>
            <Route path="/:locale/products" element={<ProductsPage />} />
            <Route
              path="/:locale/shopping-cart"
              element={<ShoppingCartPage />}
            />
            <Route path="/" element={<Navigate to="/en/products" />} />
            <Route path="*" element={<Navigate to="/en/products" />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        抖音电子商城 ©2024 Created by TikTok
        <div style={{ marginTop: '10px' }}>
          <Space size="large">
            <a
              href="https://github.com/zikunz/tiktok-take-home-assignment"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined style={{ fontSize: '24px', color: 'black' }} />
            </a>
            <a
              href="https://enchanted-stilton-322.notion.site/ae11160b277d48fb8de3f172fbe64142"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileTextOutlined style={{ fontSize: '24px', color: 'black' }} />
            </a>
          </Space>
        </div>
      </Footer>
    </Layout>
  );
};

const AppWrapper: React.FC = () => {
  const location = useLocation();
  const initialLocale = location.pathname.split('/')[1] || 'en';
  const [locale, setLocale] = useState(initialLocale);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  const antdLocale = locale === 'en' ? enUS : zhCN;

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ConfigProvider locale={antdLocale}>
        <AppContent locale={locale} changeLocale={changeLocale} />
      </ConfigProvider>
    </IntlProvider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <AppWrapper />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
