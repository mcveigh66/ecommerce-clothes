import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cart from "../pages/Cart";

test("renders cart page heading", () => {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );

  const heading = screen.getByRole("heading", {
    name: /your cart/i,
  });

  expect(heading).toBeInTheDocument();
});