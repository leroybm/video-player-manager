import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface NumberInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange?: () => void;
}

export function NumberInput<T extends FieldValues>({
  register,
  fieldName,
  placeholder,
  required,
  min,
  max,
  step,
  onChange,
}: NumberInputProps<T>) {
  return (
    <input
      className="border-gray-400 rounded border px-2 py-1 w-full"
      type="number"
      placeholder={placeholder || ""}
      step={step || 1}
      {...register(fieldName, {
        onChange: () => onChange && onChange(),
        required: required ? { value: true, message: "This field is required" } : false,
        min: min !== undefined ? { value: min, message: `Must be more than ${min}` } : Number.MIN_VALUE,
        max: max !== undefined ? { value: max, message: `Must be less than ${max}` } : Number.MAX_VALUE,
      })}
    />
  );
}
