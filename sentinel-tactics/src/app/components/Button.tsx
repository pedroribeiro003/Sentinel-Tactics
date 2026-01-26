import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      loading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all outline-none select-none";

    const shape = "rounded-md"; // mais quadrado

    const focus =
      "focus:ring-2 focus:ring-highlight/40 focus:ring-offset-2 focus:ring-offset-background";

    const disabledStyle = "disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: `
        bg-accent text-textPrimary
        hover:bg-accentHover
        shadow-md shadow-black/40
      `,

      secondary: `
        bg-surface text-textPrimary
        border border-accent/40
        hover:border-highlight hover:bg-accent/20
      `,

      ghost: `
        text-textSecondary
        hover:text-textPrimary
        hover:bg-accent/30
      `,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${base} ${shape} ${focus} ${disabledStyle} ${variants[variant]} ${className}`}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-textSecondary border-t-textPrimary" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
