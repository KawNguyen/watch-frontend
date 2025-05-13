import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-api/useAuth";
import BgAuth from "@/components/BgAuth";

const OTP_LENGTH = 6;

const VerifyOTP = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { verifyOTP, isLoading } = useAuth();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Chỉ cho phép số

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    await verifyOTP(otp.join(""));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-6 sm:py-8">
      <BgAuth />
      <div className="w-full max-w-md z-10 space-y-4 sm:space-y-6 rounded-xl border p-6 sm:p-8 shadow-xl bg-white dark:bg-zinc-900">
        <div className="space-y-2 text-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Verify Your Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="flex justify-between gap-1 sm:gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold tracking-widest border-2 border-gray-300 rounded-md focus:border-primary focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>

        <Button
          className="w-full"
          onClick={handleVerify}
          disabled={otp.includes("") || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
};

export default VerifyOTP;
