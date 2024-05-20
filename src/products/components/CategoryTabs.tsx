import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { selectedCategoryAtom, cartAtom } from '../../context/store';
import { Tabs, Badge, notification } from 'antd';
import styled from 'styled-components';
import { getCategories } from '../../services/categoryService';
import { atom } from 'jotai';

const categoriesAtom = atom<any[]>([]); // Define atom here or export it from store

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none !important;
  }

  .ant-tabs-tab {
    flex: 1;
    text-align: center;
  }

  .ant-tabs-tab-active {
    border-bottom: none !important;
  }

  .ant-tabs-ink-bar {
    display: none !important;
  }
`;

const CategoryTabs: React.FC = () => {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [cart] = useAtom(cartAtom);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        if (error instanceof Error) {
          notification.error({
            message: 'Error',
            description: error.message,
            placement: 'topRight',
          });
        }
      }
    };

    fetchCategories();
  }, [setCategories]);

  const getCountForCategory = (categoryId: string) => {
    return cart.reduce(
      (count, item) =>
        item.category === categoryId ? count + item.quantity : count,
      0
    );
  };

  const tabStyle: React.CSSProperties = {
    border: '2px solid #1890ff',
    borderRadius: '4px',
    padding: '5px',
    position: 'relative',
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
  };

  const categoryNameStyle: React.CSSProperties = {
    fontSize: '16px',
    padding: '0 10px',
  };

  const items = categories.map((category) => ({
    key: category.category_id,
    label: (
      <div
        style={
          selectedCategory === category.category_id
            ? tabStyle
            : { position: 'relative' }
        }
      >
        <Badge
          count={getCountForCategory(category.category_id)}
          style={badgeStyle}
        >
          <span style={categoryNameStyle}>{category.name}</span>
        </Badge>
      </div>
    ),
  }));

  return (
    <StyledTabs
      activeKey={selectedCategory}
      onChange={setSelectedCategory}
      tabBarStyle={{ display: 'flex', justifyContent: 'center' }}
      items={items}
    />
  );
};

export default CategoryTabs;
