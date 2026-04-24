import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001"
});

// PRODUCTS
export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);

// CART
export const getCart = () => API.get("/cart");
export const addToCart = (item) => API.post("/cart", item);
export const removeFromCart = (id) => API.delete(`/cart/${id}`);
export const updateCartItem = (id, updatedItem) =>
  API.patch(`/cart/${id}`, updatedItem);