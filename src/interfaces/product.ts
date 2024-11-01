export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrls: string[];
  isActive: boolean;
}