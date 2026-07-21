import { useRef } from "react";

export default function OTPInput({
  length = 6,
  value,
  onChange,
}) {
  const inputRefs = useRef([]);

  const handleChange = (index, inputValue) => {
    if (!/^\d?$/.test(inputValue)) return;

    const otp = [...value];
    otp[index] = inputValue;
    onChange(otp.join(""));

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const otp = Array(length).fill("");

    pasted.split("").forEach((digit, i) => {
      otp[i] = digit;
    });

    onChange(otp.join(""));

    const focusIndex = Math.min(
      pasted.length,
      length - 1
    );

    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) =>
            handleChange(index, e.target.value)
          }
          onKeyDown={(e) =>
            handleKeyDown(index, e)
          }
          onPaste={handlePaste}
          className="h-14 w-14 rounded-xl border border-input bg-background text-center text-xl font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      ))}
    </div>
  );
}