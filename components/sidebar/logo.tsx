import classNames from "classnames"

interface LogoProps {
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  isCollapsed: boolean
}

export function Logo({ isCollapsed, setSidebarCollapsed }: LogoProps) {
  return (
    <strong className="flex items-center max-lg:pointer-events-none gap-3 text-xl font-semibold text-zinc-900">
      <span
        onClick={() => setSidebarCollapsed((prev) => !prev)}
        className="h-7 w-7 bg-zinc-300 rounded-lg cursor-pointer"
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
