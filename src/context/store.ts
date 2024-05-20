import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface Product {
  product_id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export const selectedCategoryAtom = atom<string>('c1');

export const cartAtom = atomWithStorage<CartItem[]>('cart', []);
