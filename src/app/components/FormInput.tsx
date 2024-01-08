// components/FormInput.tsx
import React, { ChangeEvent } from "react";

interface FormInputProps {
  classname: string;
  type: string;
  autocomplete?: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  action?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  classname,
  type,
  autocomplete,
  placeholder,
  required,
  id,
  action,
  value,
}) => {
  return (
    <input
      type={type}
      className={classname}
      autoComplete={autocomplete}
      placeholder={placeholder}
      required={required}
      id={id}
      onChange={action}
      value={value}
    />
  );
};

export default FormInput;
