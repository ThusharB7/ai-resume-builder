import { Card, CardContent } from "@/components/ui/card";

export default function AuthCard({ children }) {
  return (
    <Card className="w-full border-border/50 shadow-2xl backdrop-blur">
      <CardContent className="space-y-8 p-8">
        {children}
      </CardContent>
    </Card>
  );
}