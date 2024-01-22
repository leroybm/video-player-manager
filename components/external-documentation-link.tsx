interface ExternalDocumentationLinkProps {
  className?: string
  href: string
  label?: string
}

export function ExternalDocumentationLink({
  className,
  href,
  label,
}: ExternalDocumentationLinkProps) {
  return (
    <p className={className}>
      <a
        className="text-blue-700"
        href={href}
        target="_blank">
        Open {label || ""} documentation in a new tab&nbsp;↗️
      </a>
    </p>
  )
}
