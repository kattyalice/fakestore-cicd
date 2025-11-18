import { createContext, useContext, type ReactNode, useReducer } from "react";
import type { Product } from "../types/types";

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_SELECTED_CATEGORY"; payload: string };

interface ProductState {
  products: Product[];
  selectedCategory: string;
}

const initialState: ProductState = {
  products: [],
  selectedCategory: "",
};

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  if (action.type === "SET_PRODUCTS") {
    return { ...state, products: action.payload };
  }

  if (action.type === "SET_SELECTED_CATEGORY") {
    return { ...state, selectedCategory: action.payload };
  }

  // Vercel strict TS build requires this
  return state;
};

interface ProductContextType extends ProductState {
  dispatch: React.Dispatch<ProductAction>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

ProductContext.displayName = "ProductContext";

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};