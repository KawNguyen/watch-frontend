import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/use-api/useAuth";
import BgAuth from "@/components/BgAuth";

interface LoginFormInputs {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-200 px-4 py-6 sm:py-8">
      <BgAuth />
      <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8 tracking-tight">
          Welcome to Luxwatch
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md">
                {error}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        placeholder="you@example.com"
                        className="pl-10 focus:ring-2 focus:ring-black/50"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 focus:ring-2 focus:ring-black/50"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={form.watch("remember")}
                  onCheckedChange={(checked) =>
                    form.setValue("remember", checked === true)
                  }
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white text-base py-2"
              disabled={isLoading}
            >
              <LogIn className="mr-2" size={20} />
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                className="text-gray-800 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
