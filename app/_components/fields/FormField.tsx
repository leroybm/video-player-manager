import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  errorMessage?: string | undefined;
  forCheckbox?: boolean;
  externalLink?: string;
}

export function FormField({ label, children, errorMessage, forCheckbox, externalLink }: FormFieldProps) {
  const wrappedLabel = externalLink ? (
    <>
      {label}
      <a
        className="text-blue-700"
        href={externalLink}
        target="_blank"
        title={`Open ${label} documentation in a new tab`}
      >
        &nbsp;↗️
      </a>
    </>
  ) : (
    label
  );

  return (
    <label className={`pb-2 w-full ${forCheckbox ? "inline-block" : "block"}`}>
      {!forCheckbox && <p className="text-sm">{wrappedLabel}</p>}
      {children}
      {forCheckbox && <p className="inline pl-1">{wrappedLabel}</p>}
      <small className="text-red-500">{errorMessage ? <p>{errorMessage}</p> : null}</small>
    </label>
  );
}
