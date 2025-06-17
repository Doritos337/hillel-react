import { create } from "zustand";
import { getAuthToken, setAuthToken, removeAuthToken } from "../utils/auth";

export const useAuthStore = create((set) => ({
  isAuthenticated: !!getAuthToken(),

  login: (username, password) => {
    if (username === "test" && password === "password") {
      const fakeToken = "fake-token";
      setAuthToken(fakeToken);
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    removeAuthToken();
    set({ isAuthenticated: false });
  },
}));
