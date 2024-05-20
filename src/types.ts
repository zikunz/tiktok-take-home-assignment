export interface Category {
  category_id: string;
  name: string;
}

export interface Product {
  product_id: string;
  name: string;
  price: number;
  category: string;
}
