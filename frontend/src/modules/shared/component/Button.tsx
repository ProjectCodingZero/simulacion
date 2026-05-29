import React from "react";
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${props.variant}`} {...props}>
      {children}
    </button>
  );
}
