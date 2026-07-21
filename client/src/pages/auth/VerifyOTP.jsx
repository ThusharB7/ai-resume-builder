import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "@/layouts/AuthLayout";
import OTPInput from "@/components/forms/OTPInput";
import SubmitButton from "@/components/forms/SubmitButton";
import authService from "@/services/authService";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("verificationEmail");

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("1. Submit clicked");
    console.log({
      email,
      otp,
    });

    if (otp.length !== 6) {
      return toast.error("Please enter the 6-digit OTP");
    }

    try {
      setLoading(true);

      console.log("2. Calling verifyOtp API...");

      const response = await authService.verifyOtp({
        email,
        otp,
      });

      console.log("3. API Success");
      console.log(response);

      sessionStorage.removeItem("verificationEmail");

      toast.success("Email verified successfully!");

      navigate("/login");
    } catch (error) {
      console.log("4. API Error");
      console.log(error);
      console.log(error.response);

      toast.error(
        error.response?.data?.message ||
          "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);

      const response = await authService.resendOtp(email);

      toast.success(response.message);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to resend OTP"
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Email"
      subtitle={`Enter the 6-digit code sent to ${email}`}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <OTPInput
          value={otp}
          onChange={setOtp}
        />

        <SubmitButton loading={loading}>
          Verify OTP
        </SubmitButton>

        <p className="text-center text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resending}
            className="font-semibold text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}