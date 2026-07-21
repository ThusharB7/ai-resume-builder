import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";

import {
  registerSchema,
  defaultValues,
} from "@/schemas/registerSchema";

import authService from "@/services/authService";

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data) => {
    try {
      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration successful! Verify your email.");

      sessionStorage.setItem("verificationEmail", data.email);

navigate("/verify-otp");
    } catch (error) {
  console.log(error);
  console.log(error.response);

  toast.error(
    error.response?.data?.message || "Registration failed"
  );
}
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <TextInput
        label="Full Name"
        id="name"
        placeholder="John Doe"
        error={errors.name}
        register={register("name")}
      />

      <TextInput
        label="Email"
        id="email"
        placeholder="john@example.com"
        error={errors.email}
        register={register("email")}
      />

      <PasswordInput
        label="Password"
        id="password"
        placeholder="••••••••"
        error={errors.password}
        register={register("password")}
      />

      <PasswordInput
        label="Confirm Password"
        id="confirmPassword"
        placeholder="••••••••"
        error={errors.confirmPassword}
        register={register("confirmPassword")}
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) =>
            setValue("rememberMe", !!checked)
          }
        />

        <Label
          htmlFor="rememberMe"
          className="cursor-pointer"
        >
          Remember me
        </Label>
      </div>

      <SubmitButton loading={isSubmitting}>
        Create Account
      </SubmitButton>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}