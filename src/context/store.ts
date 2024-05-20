import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface CartItem {
  product_id: string;
  quantity: number;
}

export const selectedCategoryAtom = atom<string>('c1');

export const cartAtom = atomWithStorage<CartItem[]>('cart', []);
