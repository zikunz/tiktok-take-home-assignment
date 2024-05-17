import { atom } from 'jotai';

interface Category {
  category_id: string;
  name: string;
}

interface Product {
  product_id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export const categoriesAtom = atom<Category[]>([
  { category_id: 'c1', name: '电视' },
  { category_id: 'c2', name: '水果' },
  { category_id: 'c3', name: '饮料' },
]);

export const productsAtom = atom<Product[]>([
  { product_id: 'p1', name: '索尼', price: 10200, category: 'c1' },
  { product_id: 'p2', name: '小米', price: 3000, category: 'c1' },
  { product_id: 'p3', name: 'TCL', price: 5000, category: 'c1' },
  { product_id: 'p4', name: '创维', price: 8000, category: 'c1' },
  { product_id: 'p5', name: '苹果', price: 3, category: 'c2' },
  { product_id: 'p6', name: '香蕉', price: 4, category: 'c2' },
  { product_id: 'p7', name: '梨子', price: 5, category: 'c2' },
  { product_id: 'p8', name: '西瓜', price: 6, category: 'c2' },
  { product_id: 'p9', name: '山竹', price: 7, category: 'c2' },
  { product_id: 'p10', name: '可口可乐', price: 3, category: 'c3' },
  { product_id: 'p11', name: '养乐多', price: 12, category: 'c3' },
  { product_id: 'p12', name: '农夫山泉', price: 2, category: 'c3' },
]);

export const cartAtom = atom<CartItem[]>([]);
export const selectedCategoryAtom = atom<string>('c1');
