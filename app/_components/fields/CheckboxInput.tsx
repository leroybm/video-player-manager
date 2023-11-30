import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface CheckboxInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  onChange?: () => void;
}

export function CheckboxInput<T extends FieldValues>({ fieldName, register, onChange }: CheckboxInputProps<T>) {
  return <input type="checkbox" {...register(fieldName, { onChange: () => onChange && onChange() })} />;
}
