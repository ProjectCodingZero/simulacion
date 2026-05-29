import React, { type HTMLInputTypeAttribute } from "react";
interface FormFieldProps {
  disabled?: boolean;
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
