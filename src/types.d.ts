type ProductStatus = "Active" | "Draft" | "Archived";

type ProductReviews = {
  id: number;
  user: string;
  rating: number;
  text: string;
  created_at: string;
}

type Product = {
  id: number;
  name: string;
  img: string;
  description: string;
  status: ProductStatus | string;
  total_sales: number;
  price: number;
  reviews: ProductReviews[];
  categories: string[];
  updated_at: string;
  created_at: string;
}