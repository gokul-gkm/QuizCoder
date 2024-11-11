import { IconType } from "react-icons";

interface FormInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  Icon: IconType;
  label: string;
}

export default function FormInput({
  id,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  maxLength,
  Icon,
  label
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-200 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full pl-10 bg-gray-900/50 border border-gray-800 rounded-lg p-2.5 text-white text-sm"
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
}