import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";

jest.mock("../redux/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 9.99,
    description: "Test description",
    category: "electronics",
    image: "test.jpg",
    rating: { rate: 4, count: 100 },
  };

  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  test("renders product details", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("ELECTRONICS")).toBeInTheDocument();
  });

  test("dispatches addToCart when button is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    const button = screen.getByText("Add to cart");
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct));
  });
});