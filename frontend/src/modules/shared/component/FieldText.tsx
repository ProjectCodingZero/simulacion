import type React from "react";

interface FormFieldProps {
  children: React.ReactNode | React.ReactNode[];
  legend?: string;
  className?: string;
}

function FormField({ children, legend, className }: FormFieldProps) {
  return (
    <fieldset className={className}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}

export default FormField;
