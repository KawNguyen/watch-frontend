import { create } from "zustand";
import { cart } from "@/api/cart";
import { favorite } from "@/api/favorite";

interface GlobalStore {
  cartCount: number;
  favoriteCount: number;
  setCartCount: (count: number) => void;
  setFavoriteCount: (count: number) => void;
  fetchCounts: (userId: string) => Promise<void>;
  updateCartCount: (userId: string) => Promise<void>;
  updateFavoriteCount: (userId: string) => Promise<void>;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  cartCount: 0,
  favoriteCount: 0,

  setCartCount: (count) => set({ cartCount: count }),
  setFavoriteCount: (count) => set({ favoriteCount: count }),

  updateCartCount: async (userId) => {
    try {
      const cartResponse = await cart.getUserCart(userId);
      set({ cartCount: cartResponse.data.item.items.length });
    } catch (error) {
      console.error("Failed to update cart count:", error);
    }
  },

  updateFavoriteCount: async (userId) => {
    try {
      const favoriteResponse = await favorite.getUserFavorite(userId);
      set({ favoriteCount: favoriteResponse.data.items.length });
    } catch (error) {
      console.error("Failed to update favorite count:", error);
    }
  },

  fetchCounts: async (userId) => {
    try {
      const cartResponse = await cart.getUserCart(userId);
      const favoriteResponse = await favorite.getUserFavorite(userId);

      set({
        cartCount: cartResponse.data.item.items.length,
        favoriteCount: favoriteResponse.data.items.length,
      });
    } catch (error) {
      console.error("Failed to fetch counts:", error);
    }
  },
}));
