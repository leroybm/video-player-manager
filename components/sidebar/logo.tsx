import classNames from "classnames"

interface LogoProps {
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  isCollapsed: boolean
}

export function Logo({ isCollapsed, setSidebarCollapsed }: LogoProps) {
  return (
    <strong className="flex items-center gap-3 text-xl font-semibold text-zinc-900 max-lg:pointer-events-none">
      <span
        onClick={() => setSidebarCollapsed((prev) => !prev)}
        className="h-7 w-7 cursor-pointer rounded-lg bg-zinc-300"
      />
      <span
        onClick={() => setSidebarCollapsed((prev) => !prev)}
        className={classNames({
          "font-medium text-zinc-700": true,
          "lg:hidden": isCollapsed,
        })}>
        FP Manager
      </span>
    </strong>
  )
}
