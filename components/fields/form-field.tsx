import { ReactNode } from "react"

interface FormFieldProps {
  label: string
  children: ReactNode
  errorMessage?: string | undefined
  forCheckbox?: boolean
  externalLink?: string
}

export function FormField({
  label,
  children,
  errorMessage,
  forCheckbox,
  externalLink,
}: FormFieldProps) {
  const wrappedLabel =
    externalLink ? <span className="inline text-lg">{label}</span> : label

  return (
    <div className="mb-3">
      <label className={`w-full ${forCheckbox ? "inline-block" : "block"}`}>
        {!forCheckbox && <p className="text-sm">{wrappedLabel}</p>}
        {children}
        {forCheckbox && <p className="inline pl-1">{wrappedLabel}</p>}
        <small className="text-red-500">
          {errorMessage ?
            <p>{errorMessage}</p>
          : null}
        </small>
      </label>
      <a
        tabIndex={0}
        className="text-sm text-blue-700"
        href={externalLink}
        target="_blank">
        Go to {label} docs ↗️
      </a>
    </div>
  )
}
