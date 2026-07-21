import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue building your resume."
    >
      <LoginForm />
    </AuthLayout>
  );
}