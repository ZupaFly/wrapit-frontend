export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  mainImageUrl: string;
  images: {
    id: number;
    imageUrl: string;
  }[];
  categoriesIds: number[];
  category?: string;
  totalReviews: number;
  averageRating: number;
  reviews: {
    userName: string;
    reviewId: number;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
  quantity: number;
}


export interface FiltersType {
  minPrice: number;
  maxPrice: number;
  categories: string[];
}