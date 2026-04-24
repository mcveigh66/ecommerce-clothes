import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const mockProduct = {
  id: 1,
  name: "Test Jacket",
  price: 99.99,
  image: "test.jpg"
};

test("renders product card with data", () => {
  render(
    <BrowserRouter>
      <ProductCard product={mockProduct} />
    </BrowserRouter>
  );

  expect(screen.getByText(/test jacket/i)).toBeInTheDocument();
  expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});