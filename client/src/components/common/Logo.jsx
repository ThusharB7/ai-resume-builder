import { FileText } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
        <FileText className="h-6 w-6" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight">
          AI Resume Builder
        </h1>

        <p className="text-sm text-muted-foreground">
          Build resumes smarter with AI
        </p>
      </div>
    </div>
  );
}