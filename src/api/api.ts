import axios from "axios";
import type { Product, Category } from "../types/types";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const fetchProducts = (): Promise<Product[]> =>
  apiClient.get("/products").then((res) => res.data);

export const fetchCategories = (): Promise<Category[]> =>
  apiClient.get("/products/categories").then((res) => res.data);

export const fetchProductById = (id: number): Promise<Product> =>
  apiClient.get(`/products/${id}`).then((res) => res.data);