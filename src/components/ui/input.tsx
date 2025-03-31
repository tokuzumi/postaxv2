"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md bg-[#20222C] border border-[#414151] px-3 py-2",
          "text-white placeholder:text-gray-400 focus:outline-none focus:ring-2",
          "focus:ring-[#00E1FF] focus:border-[#00E1FF]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error &&
            "border-[#ff3586] focus:border-[#ff3586] focus:ring-[#ff3586]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input }; 