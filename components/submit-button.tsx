interface SubmitButtonProps {
  disabled?: boolean
}

export function SubmitButton({ disabled }: SubmitButtonProps) {
  return (
    <button
      className={`mt-4 rounded-2xl bg-blue-400 px-4 py-1 text-xl text-white shadow ${
        disabled && "cursor-not-allowed"
      }`}
      disabled={disabled}
      type="submit">
      Save Section
    </button>
  )
}
