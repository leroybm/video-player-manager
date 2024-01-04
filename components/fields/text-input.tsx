import { FieldValues, Path, UseFormRegister } from "react-hook-form"

interface TextInputProps<T extends FieldValues> {
  register: UseFormRegister<T>
  fieldName: Path<T>
  required?: boolean
  minLength?: number
  validate?: (value: string) => boolean
  placeholder?: string
  validateMessage?: string
  onChange?: () => void
  pattern?: RegExp
  patternMessage?: string
  setValueAs?: (value: unknown) => unknown
}

export function TextInput<T extends FieldValues>({
  register,
  fieldName,
  required,
  minLength,
  validate,
  placeholder,
  validateMessage,
  onChange,
  pattern,
  patternMessage,
  setValueAs,
}: TextInputProps<T>) {
  return (
    <input
      className="w-full rounded border border-gray-400 px-2 py-1"
      type="text"
      placeholder={placeholder || ""}
      {...register(fieldName, {
        onChange: () => onChange && onChange(),

        pattern: pattern && {
          value: pattern,
          message: patternMessage || `This field doesn't match the pattern`,
        },
        required:
          required ? { value: true, message: "This field is required" } : false,
        minLength:
          minLength !== undefined ?
            { value: minLength, message: `Must be longer than ${minLength}` }
          : Number.MIN_VALUE,
        validate: validate && ((value) => validate(value) || validateMessage),
        setValueAs: setValueAs,
      })}
    />
  )
}
