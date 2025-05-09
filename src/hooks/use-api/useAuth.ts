import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/api/auth";
import { useToast } from "../use-toast";

export const useAuth = () => {
  const { toast } = useToast();
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
        credentials.recaptchaToken
      );
      localStorage.setItem("userId", response.user.id);
      toast({
        title: "Success",
        description: "Registration successful! Welcome aboard.",
        className: "bg-green-500 text-white border-none",
      });
      navigate("/auth/verify-otp");
    } catch (err: any) {
      let errorMessage = "An error occurred during registration";
      if (err.response) {
        errorMessage = err.response.data?.message || "Registration failed";
      } else if (err.request) {
        errorMessage = "Unable to reach the server";
      }
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
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
        credentials.password
      );
      localStorage.setItem("userId", response.user.id);
      // toast({
      //   title: "Success",
      //   description: "Welcome back!",
      //   className: "bg-green-500 text-white border-none",
      // });
      navigate("/auth/verify-otp");
    } catch (err: any) {
      let errorMessage = "An error occurred during login";
      if (err.response) {
        errorMessage = err.response.data?.message || "Invalid credentials";
      } else if (err.request) {
        errorMessage = "Unable to reach the server";
      }
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
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

  const verifyOTP = async (otp: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Missing userId for OTP verification");

      const response = await authAPI.verifyOTP(userId, otp);
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.removeItem("userId");
      toast({
        title: "Success",
        description: "OTP verification successful!",
        className: "bg-green-500 text-white border-none",
      });
      navigate("/");
      return response;
    } catch (err: any) {
      let errorMessage = "An error occurred during OTP verification";
      if (err.response) {
        errorMessage = err.response.data?.message || "Invalid OTP";
      } else if (err.request) {
        errorMessage = "Unable to reach the server";
      }
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        className: "bg-red-500 text-white border-none",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    verifyOTP,
    isAuthenticated,
    getUser,
    isLoading,
    error,
  };
};
