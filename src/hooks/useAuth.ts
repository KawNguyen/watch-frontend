import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/api/auth";

interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.register(
        credentials.name,
        credentials.email,
        credentials.password,
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } catch (err: any) {
      let errorMessage = "An error occurred during registration";
      if (err.response) {
        errorMessage = err.response.data?.message || "Registration failed";
      } else if (err.request) {
        errorMessage = "Unable to reach the server";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.login(
        credentials.email,
        credentials.password,
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } catch (err: any) {
      let errorMessage = "An error occurred during login";
      if (err.response) {
        errorMessage = err.response.data?.message || "Invalid credentials";
      } else if (err.request) {
        errorMessage = "Unable to reach the server";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const getUser = () => {
    const user = localStorage.getItem("user");
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  };

  return {
    register,
    login,
    logout,
    isAuthenticated,
    getUser,
    isLoading,
    error,
  };
};
