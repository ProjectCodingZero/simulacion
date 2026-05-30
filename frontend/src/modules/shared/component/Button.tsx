import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button(
  { children, className = "", variant, ...props }: ButtonProps,
) {
  return (
    <button
      className={`btn btn-${variant ?? "secondary"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
