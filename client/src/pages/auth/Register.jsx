import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "@/components/forms/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join AI Resume Builder today."
    >
      <RegisterForm />
    </AuthLayout>
  );
}