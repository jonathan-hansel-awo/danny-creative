"use client";

import { useState, forwardRef, TextareaHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue,
    );

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const isLabelFloating = isFocused || hasValue;

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

        {/* Textarea Field */}
        <textarea
          ref={ref}
          {...props}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "w-full px-0 py-4 bg-transparent",
            "border-0 border-b-2",
            "font-body text-light-text text-base",
            "placeholder:text-transparent",
            "focus:outline-none",
            "transition-colors duration-300",
            "resize-none",
            "min-h-[120px]",
            error
              ? "border-red-500"
              : isFocused
                ? "border-coral"
                : "border-light-text/20",
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

        {/* Character count (optional) */}
        {props.maxLength && (
          <div className="absolute bottom-2 right-0 text-xs text-light-text/40">
            {String(props.value || "").length}/{props.maxLength}
          </div>
        )}

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

Textarea.displayName = "Textarea";

export default Textarea;
