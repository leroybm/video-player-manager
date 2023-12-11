import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface SelectProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  values: string[];
  required?: boolean;
  placeholder?: string;
  onChange?: () => void;
  defaultMessage?: string;
}

export function Select<T extends FieldValues>({
  register,
  fieldName,
  required,
  values,
  onChange,
  defaultMessage,
}: SelectProps<T>) {
  return (
    <select
      {...register(fieldName, {
        required: required,
        onChange: () => onChange && onChange(),
      })}
      className="border-gray-400 rounded border px-2 py-1 w-full bg-transparent"
    >
      {!required && <option value="">{defaultMessage || "Select a value"}</option>}
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
