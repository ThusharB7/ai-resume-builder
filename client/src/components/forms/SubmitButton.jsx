import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SubmitButton({
  loading,
  children,
}) {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        children
      )}
    </Button>
  );
}