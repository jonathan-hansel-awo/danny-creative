import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-ui font-medium rounded-full transition-all duration-300 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-ink text-cream hover:bg-spark hover:translate-y-[-2px] hover:shadow-md active:translate-y-0 active:shadow-sm",
      secondary:
        "bg-transparent text-ink border-[1.5px] border-ink hover:bg-cream-dark hover:border-spark hover:text-spark",
    };

    const sizes: Record<ButtonSize, string> = {
      default: "px-8 py-4 text-[0.9375rem]",
      lg: "px-10 py-5 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        data-spark-hover
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Link styled as button
interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className = "", variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-ui font-medium rounded-full transition-all duration-300 ease-smooth";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-ink text-cream hover:bg-spark hover:translate-y-[-2px] hover:shadow-md active:translate-y-0 active:shadow-sm",
      secondary:
        "bg-transparent text-ink border-[1.5px] border-ink hover:bg-cream-dark hover:border-spark hover:text-spark",
    };

    const sizes: Record<ButtonSize, string> = {
      default: "px-8 py-4 text-[0.9375rem]",
      lg: "px-10 py-5 text-base",
    };

    return (
      <a
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        data-spark-hover
        {...props}
      >
        {children}
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";

export { Button, ButtonLink };
export type { ButtonProps, ButtonLinkProps };