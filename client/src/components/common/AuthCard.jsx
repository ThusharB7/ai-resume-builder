import { Card, CardContent } from "@/components/ui/card";

export default function AuthCard({ children }) {
  return (
    <Card className="w-full rounded-3xl border border-border/50 shadow-2xl">
      <CardContent className="p-8">
        {children}
      </CardContent>
    </Card>
  );
}