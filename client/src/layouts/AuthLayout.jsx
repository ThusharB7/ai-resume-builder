import { motion } from "framer-motion";

import ThemeToggle from "@/components/common/ThemeToggle";
import AuthHero from "@/components/common/AuthHero";
import AuthHeader from "@/components/common/AuthHeader";
import AuthCard from "@/components/common/AuthCard";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Theme Toggle */}
      <div className="absolute right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 lg:px-10">
        <div className="grid w-full items-center gap-0 lg:grid-cols-[0.9fr_500px]">
          {/* Left */}
          <AuthHero />

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <AuthCard>
              <div className="space-y-6">
                <AuthHeader
                  title={title}
                  subtitle={subtitle}
                />

                {children}
              </div>
            </AuthCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}