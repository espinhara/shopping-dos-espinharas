import { Product } from "./product";

export interface PaginatedResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: Product[];
}