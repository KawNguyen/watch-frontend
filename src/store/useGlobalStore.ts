import { create } from "zustand";
import { cart } from "@/api/cart";
import { favorite } from "@/api/favorite";

interface GlobalStore {
  cartCount: number;
  favoriteCount: number;
  resetCounts: () => void;
  setCartCount: (count: number) => void;
  setFavoriteCount: (count: number) => void;
  fetchCounts: (userId: string) => Promise<void>;
  updateCartCount: (userId: string) => Promise<void>;
  updateFavoriteCount: (userId: string) => Promise<void>;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  cartCount: 0,
  favoriteCount: 0,

  resetCounts: () => set({ cartCount: 0, favoriteCount: 0 }),
  setCartCount: (count) => set({ cartCount: count }),
  setFavoriteCount: (count) => set({ favoriteCount: count }),

  updateCartCount: async (userId) => {
    try {
      const cartResponse = await cart.getUserCart(userId);
      const count = cartResponse?.data.items || [];
      set({ cartCount: count.length });
    } catch (error) {
      console.error("Failed to update cart count:", error);
      set({ cartCount: 0 });
    }
  },

  updateFavoriteCount: async (userId) => {
    try {
      const favoriteResponse = await favorite.getUserFavorite(userId);
      const items = favoriteResponse.data?.items || [];
      set({ favoriteCount: items.length });
    } catch (error) {
      console.error("Failed to update favorite count:", error);
      set({ favoriteCount: 0 });
    }
  },

  fetchCounts: async (userId) => {
    try {
      const [cartResponse, favoriteResponse] = await Promise.all([
        cart.getUserCart(userId),
        favorite.getUserFavorite(userId),
      ]);

      const cartItems = cartResponse.data?.items || [];
      const favoriteItems = favoriteResponse.data?.items || [];

      set({
        cartCount: cartItems.length,
        favoriteCount: favoriteItems.length,
      });
    } catch (error) {
      console.error("Failed to fetch counts:", error);
      set({ cartCount: 0, favoriteCount: 0 });
    }
  },
}));
