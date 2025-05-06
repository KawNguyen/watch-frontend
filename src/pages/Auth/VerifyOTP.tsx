import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-api/useAuth";
import { useState } from "react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const { verifyOTP, isLoading } = useAuth();

  const handleVerify = async () => {
    await verifyOTP(otp);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify Your Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Please enter the verification code sent to your email
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter OTP code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={!otp || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
