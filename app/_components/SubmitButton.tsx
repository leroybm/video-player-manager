interface SubmitButtonProps {
  disabled?: boolean;
}

export function SubmitButton({ disabled }: SubmitButtonProps) {
  return (
    <button
      className={`mt-4 bg-blue-400 rounded-2xl shadow text-white px-4 py-1 text-xl ${disabled && "cursor-not-allowed"}`}
      disabled={disabled}
      type="submit"
    >
      Save Section
    </button>
  );
}
