import { motion } from "framer-motion";

import hero from "@/assets/hero.png";

import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import AuthCard from "@/components/common/AuthCard";

import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute right-6 top-6 z-10">
        <ThemeToggle />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden flex-1 lg:flex"
        >
          <div className="space-y-8">
            <Logo />

            <h2 className="text-5xl font-bold leading-tight">
              Create resumes that land interviews.
            </h2>

            <p className="max-w-lg text-lg text-muted-foreground">
              Build beautiful ATS-friendly resumes with AI assistance,
              live preview, and one-click export.
            </p>

            <img
              src={hero}
              alt="Hero"
              className="mt-8 w-full max-w-xl"
            />
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <AuthCard>
            <LoginForm />
          </AuthCard>
        </motion.div>
      </div>
    </div>
  );
}