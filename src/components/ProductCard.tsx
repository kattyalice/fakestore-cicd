import React from "react";
import type { Product } from "../types/types";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";

// ⭐ Simple fallback-safe star rating
const StarRating = ({ rate }: { rate: number }) => {
  const safeRate = Number.isFinite(rate) ? Math.round(rate) : 0;

  return (
    <div style={{ color: "#f5c518", fontSize: "1.2rem" }}>
      {"★".repeat(safeRate)}
      {"☆".repeat(5 - safeRate)}
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="col-md-3 p-3 d-flex flex-column align-items-center gap-3 shadow">
      <h3 className="text-center">{product.title}</h3>

      <img
        src={product.image}
        alt={product.title}
        className="w-25"
        style={{ objectFit: "contain" }}
      />

      <h5>{product.category?.toUpperCase()}</h5>

      <StarRating rate={product.rating?.rate ?? 0} />

      <p>${product.price}</p>

      <p className="text-muted small text-center">{product.description}</p>

      <button
        className="btn btn-primary"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;