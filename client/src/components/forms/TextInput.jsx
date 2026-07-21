import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TextInput({
  label,
  id,
  type = "text",
  placeholder,
  error,
  register,
  ...props
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <Input
  className="h-12"
  id={id}
  type={type}
  placeholder={placeholder}
  {...register}
  {...props}
/>

      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}

