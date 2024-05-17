import React from 'react';
import { useAtom } from 'jotai';
import { categoriesAtom, selectedCategoryAtom, cartAtom } from '../context/store';
import { Tabs, Badge } from 'antd';
import styled from 'styled-components';

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
  const [categories] = useAtom(categoriesAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [cart] = useAtom(cartAtom);

  const getCountForCategory = (categoryId: string) => {
    return cart.reduce((count, item) => item.category === categoryId ? count + item.quantity : count, 0);
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

  return (
    <StyledTabs
      activeKey={selectedCategory}
      onChange={setSelectedCategory}
      tabBarStyle={{ display: 'flex', justifyContent: 'center' }}
      tabBarExtraContent={null}
    >
      {categories.map(category => (
        <Tabs.TabPane
          tab={
            <div style={selectedCategory === category.category_id ? tabStyle : { position: 'relative' }}>
              <Badge count={getCountForCategory(category.category_id)} style={badgeStyle}>
                <span style={categoryNameStyle}>{category.name}</span>
              </Badge>
            </div>
          }
          key={category.category_id}
        />
      ))}
    </StyledTabs>
  );
};

export default CategoryTabs;

// // Dead code
// // Bug: Could not match the underline part with the category directly above it all the time
// import React from 'react';
// import { useAtom } from 'jotai';
// import { categoriesAtom, selectedCategoryAtom, cartAtom } from '../context/store';
// import { Tabs, Badge } from 'antd';

// const CategoryTabs: React.FC = () => {
//   const [categories] = useAtom(categoriesAtom);
//   const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
//   const [cart] = useAtom(cartAtom);

//   const getCountForCategory = (categoryId: string) => {
//     return cart.reduce((count, item) => item.category === categoryId ? count + item.quantity : count, 0);
//   };

//   const tabStyle = {
//     border: '2px solid #1890ff',
//     borderRadius: '4px',
//     padding: '5px',
//     position: 'relative' as 'relative',
//   };

//   const badgeStyle = {
//     position: 'absolute' as 'absolute',
//     top: '-10px',
//     right: '-10px',
//   };

//   const categoryNameStyle = {
//     fontSize: '16px',
//     padding: '0 10px',
//   };

//   const customTabPaneStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     flex: 1,
//     textAlign: 'center' as 'center',
//   };

//   return (
//     <Tabs
//       activeKey={selectedCategory}
//       onChange={setSelectedCategory}
//       tabBarStyle={{ borderBottom: 'none', display: 'flex', justifyContent: 'center' }}
//       tabBarExtraContent={null}
//       moreIcon={null}
//       renderTabBar={(props, DefaultTabBar) => (
//         <DefaultTabBar {...props} style={{ borderBottom: 'none', display: 'flex', justifyContent: 'center' }} />
//       )}
//     >
//       {categories.map(category => (
//         <Tabs.TabPane
//           tab={
//             <div style={selectedCategory === category.category_id ? tabStyle : { position: 'relative' }}>
//               <Badge count={getCountForCategory(category.category_id)} style={badgeStyle}>
//                 <span style={categoryNameStyle}>{category.name}</span>
//               </Badge>
//             </div>
//           }
//           key={category.category_id}
//           style={customTabPaneStyle}
//         />
//       ))}
//     </Tabs>
//   );
// };

// export default CategoryTabs;
