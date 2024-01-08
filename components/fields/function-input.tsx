import React from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { getErrorMessage } from "@/lib/utils/errors"

/**
 * Validates that a string is a valid function
 *
 * @param fn A function string, also accepts a function in case that it's coming natively (For example, a default value)
 */
export function functionValidator<T>(fn: string | T): boolean {
  if (typeof fn === "function" || fn === "") {
    return true
  }

  try {
    return typeof (new Function("return " + fn)() as T) === "function"
  } catch (error: unknown) {
    throw new Error(
      `Error trying to get the botLogMessage to update.\nMessage: ${getErrorMessage(
        error
      )}`
    )
  }
}

interface FunctionInputInterface<T extends FieldValues> {
  register: UseFormRegister<T>
  fieldName: Path<T>
  placeholder?: string
}

export function FunctionInput<T extends FieldValues>({
  register,
  fieldName,
  placeholder,
}: FunctionInputInterface<T>) {
  function handleCustomKeys(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Tab") {
      event.stopPropagation()
      event.preventDefault() // TODO: Implement ease of use shortcuts
    }
  }

  return (
    <textarea
      className="-mb-1.5 w-full rounded border border-gray-400 px-2 py-1"
      placeholder={placeholder || ""}
      onKeyDown={handleCustomKeys}
      {...register(fieldName, {
        validate: (value) => functionValidator(value) || "Not a valid function",
      })}></textarea>
  )
}
