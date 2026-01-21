"use client";

import { useState, forwardRef, InputHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, size = "md", className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue,
    );

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const isLabelFloating = isFocused || hasValue;

    const sizeStyles = {
      sm: "py-3 text-sm",
      md: "py-4 text-base",
      lg: "py-5 text-lg",
    };

    return (
      <div className={cn("relative", className)}>
        {/* Floating Label */}
        <motion.label
          className={cn(
            "absolute left-0 pointer-events-none",
            "font-body transition-colors duration-300",
            error
              ? "text-red-500"
              : isFocused
                ? "text-coral"
                : "text-light-text/50",
          )}
          animate={{
            y: isLabelFloating ? -24 : 16,
            scale: isLabelFloating ? 0.85 : 1,
            x: isLabelFloating ? -4 : 0,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {label}
          {props.required && <span className="text-coral ml-1">*</span>}
        </motion.label>

        {/* Input Field */}
        <input
          ref={ref}
          {...props}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "w-full px-0 bg-transparent",
            "border-0 border-b-2",
            "font-body text-light-text",
            "placeholder:text-transparent",
            "focus:outline-none",
            "transition-colors duration-300",
            error
              ? "border-red-500"
              : isFocused
                ? "border-coral"
                : "border-light-text/20",
            sizeStyles[size],
          )}
        />

        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-coral"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "left" }}
        />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
