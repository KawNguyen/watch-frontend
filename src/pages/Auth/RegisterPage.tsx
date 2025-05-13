import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, User, LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-api/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_KEY } from "@/config/captcha";
import BgAuth from "@/components/BgAuth";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  captchaToken: string;
}

const InputField = ({
  name,
  label,
  type = "text",
  icon: Icon,
  placeholder,
  form,
  rules,
  showPasswordToggle = false,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Icon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type={
                  showPasswordToggle
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                placeholder={placeholder}
                className="pl-10 pr-10"
                {...field}
              />
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const RegisterPage = () => {
  const { register, isLoading, error: authError } = useAuth();
  const form = useForm<RegisterFormInputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      captchaToken: "",
    },
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormInputs) => {
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }
    await register({
      name: data.username,
      email: data.email,
      password: data.password,
      recaptchaToken,
    });
  };

  const inputFields = [
    {
      name: "username",
      label: "Username",
      icon: User,
      placeholder: "Enter your username",
      rules: {
        required: "Username is required",
        minLength: {
          value: 3,
          message: "Username must be at least 3 characters",
        },
      },
    },
    {
      name: "email",
      label: "Email",
      icon: Mail,
      placeholder: "Enter your email",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      icon: Lock,
      placeholder: "Enter your password",
      type: "password",
      showPasswordToggle: true,
      rules: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      icon: Lock,
      placeholder: "Confirm your password",
      type: "password",
      showPasswordToggle: true,
      rules: {
        required: "Please confirm your password",
        validate: (value: string) =>
          value === form.getValues("password") || "Passwords do not match",
      },
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 sm:py-8">
      <BgAuth />
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md z-10">
        <h2 className="text-2xl lg:text-4xl font-bold text-center mb-4 sm:mb-6">
          Join Our Exclusive Collection
        </h2>
        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
            {authError}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {inputFields.map((field) => (
              <InputField key={field.name} {...field} form={form} />
            ))}

            <ReCAPTCHA
              sitekey={RECAPTCHA_KEY}
              onChange={(token) => setRecaptchaToken(token)}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              <LogIn className="mr-2" size={20} />
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-black hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
