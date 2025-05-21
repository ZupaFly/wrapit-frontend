export interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  mainImageUrl: string;
}

export interface FiltersType {
  minPrice: number;
  maxPrice: number;
  categories: string[];
}