import { useEffect } from "react";
import type { Product } from "../types/types";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../api/api";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { products, selectedCategory, dispatch } = useProductContext();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (productsData) {
      dispatch({ type: "SET_PRODUCTS", payload: productsData });
    }
  }, [productsData, dispatch]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const filteredProducts = selectedCategory
    ? products.filter((p: Product) => p.category === selectedCategory)
    : products;

  return (
    <div>
      <select
        onChange={(e) =>
          dispatch({
            type: "SET_SELECTED_CATEGORY",
            payload: e.target.value,
          })
        }
        value={selectedCategory}
      >
        <option value="">All Categories</option>

        {categories?.map((category: string) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>

      <button
        className="btn btn-secondary ms-2"
        onClick={() =>
          dispatch({ type: "SET_SELECTED_CATEGORY", payload: "" })
        }
      >
        Clear Filter
      </button>

      <button className="btn btn-info ms-2" onClick={() => navigate("/profile")}>
        Go to Profile Page
      </button>

      {isLoading && <h1>Loading...</h1>}

      <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;