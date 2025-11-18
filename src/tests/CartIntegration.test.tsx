import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import ProductCard from "../components/ProductCard";
import Cart from "../pages/Cart";

describe("Cart Integration Test", () => {
  const mockProduct = {
    id: 99,
    title: "Integration Test Product",
    price: 12.5,
    description: "Testing product",
    category: "electronics",
    image: "test.jpg",
    rating: { rate: 4, count: 10 },
  };

  const createTestStore = () =>
    configureStore({
      reducer: { cart: cartReducer },
    });

  test("cart updates when product is added", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <div>
          <ProductCard product={mockProduct} />
          <Cart />
        </div>
      </Provider>
    );

    fireEvent.click(screen.getByText("Add to cart"));

    const titles = screen.getAllByText("Integration Test Product");
    expect(titles.length).toBeGreaterThanOrEqual(2);

    expect(screen.getAllByText("$12.5").length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText(/Total items: 1/)).toBeInTheDocument();
  });
});