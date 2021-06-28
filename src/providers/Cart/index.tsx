import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { ProductProps } from "../../Types/Product";

interface CartContextProps {
  cart: ProductProps[];
  setCart: Dispatch<SetStateAction<ProductProps[]>>;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ProductProps[]>([] as ProductProps[]);

  const loadProducts = () => {
    const obj: string = localStorage.getItem("cart") || "";
    const items = JSON.parse(obj);
    setCart(items);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
