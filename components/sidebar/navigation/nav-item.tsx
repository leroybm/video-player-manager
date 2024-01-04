import Link from "next/link"
import { usePathname } from "next/navigation"
import classNames from "classnames"
import { SideNavItem } from "../constants"

interface NavItemProps {
  item: SideNavItem
  isCollapsed: boolean
  onClose: () => void
}

export function NavItem({
  item: { path, title, icon: Icon },
  onClose,
  isCollapsed,
}: NavItemProps) {
  const pathname = usePathname()

  const handleOnClose = () => onClose()

  return (
    <div className="group relative">
      <Link
        href={path}
        onClick={handleOnClose}
        className={`group flex flex-row items-center gap-3 rounded p-2 px-3 hover:relative hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500 ${
          path === pathname ? "bg-zinc-100" : ""
        }`}>
        {Icon && <Icon className="h-6 w-6 flex-shrink-0 text-zinc-500" />}
        <span
          className={classNames({
            "font-medium text-zinc-700 group-hover:text-violet-500": true,
            "lg:hidden": isCollapsed,
          })}>
          {title}
        </span>
      </Link>
      {isCollapsed && (
        <div
          className={classNames({
            "absolute left-14 right-0 top-1 hidden w-max rounded bg-[#333] px-3 py-[6px] text-[13px] font-semibold text-white shadow-lg lg:group-hover:block":
              true,
          })}>
          {title}
        </div>
      )}
    </div>
  )
}
