import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import hero from "@/assets/hero.png";
import Logo from "./Logo";

const features = [
  "ATS-friendly resume templates",
  "AI-powered writing assistance",
  "Export to PDF in one click",
];

export default function AuthHero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:flex flex-col justify-center"
    >
      <Logo />

      <h1 className="mt-8 max-w-md text-5xl font-bold leading-tight tracking-tight">
        Create resumes that land interviews.
      </h1>

      <p className="mt-5 max-w-md text-lg text-muted-foreground">
        Build beautiful ATS-friendly resumes with AI assistance,
        live preview and one-click PDF export.
      </p>

      <div className="mt-8 space-y-3">
        {features.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-primary" />

            <span className="text-muted-foreground">
              {item}
            </span>
          </div>
        ))}
      </div>

      <img
        src={hero}
        alt="Hero"
        className="mt-8 w-[320px]"
      />
    </motion.div>
  );
}