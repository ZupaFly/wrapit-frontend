export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface FiltersType {
  minPrice: number;
  maxPrice: number;
  categories: string[];
}