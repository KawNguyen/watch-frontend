import { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { OrderProvider } from "./OrderContext";
import { UserProvider } from "./UserContext";

const AppContext = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <CartProvider>
        <OrderProvider>
          <FavoriteProvider>{children}</FavoriteProvider>
        </OrderProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default AppContext;
