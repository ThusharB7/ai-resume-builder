import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";

import { loginSchema, defaultValues } from "@/schemas/loginSchema";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data) => {
    try {
      await login(data);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
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

      <div className="flex items-center justify-between">
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

        <button
          type="button"
          className="text-sm text-primary hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <SubmitButton loading={isSubmitting}>
        Sign In
      </SubmitButton>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}