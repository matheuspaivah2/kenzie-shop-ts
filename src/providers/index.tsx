import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { CartProvider } from "./Cart";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default Providers;
