// Input.tsx

import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
  className?: string; // Allow className to be passed in
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  className = "", // Default to an empty string if no className is provided
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 ${className}`} // Apply className here
      />
    </div>
  );
};

export default Input;
