"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-lg font-medium
      transition-all duration-300 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
      disabled:opacity-50 disabled:pointer-events-none
      hover:scale-105 active:scale-95
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-blue-600 to-blue-400
        hover:from-blue-500 hover:to-blue-300
        text-white shadow-lg shadow-blue-500/20
        focus:ring-blue-500
      `,
      secondary: `
        bg-gray-800 text-gray-100 
        hover:bg-gray-700
        border border-gray-700 
        shadow-lg shadow-gray-900/20
        focus:ring-gray-500
      `,
      danger: `
        bg-gradient-to-r from-red-600 to-red-400
        hover:from-red-500 hover:to-red-300
        text-white shadow-lg shadow-red-500/20
        focus:ring-red-500
      `,
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "opacity-50 cursor-wait",
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
