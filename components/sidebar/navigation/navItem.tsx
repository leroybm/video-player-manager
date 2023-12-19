"use client"

import { SideNavItem } from "../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export function NavItem({ item: { path, title, icon: Icon }, onClose, isCollapsed }: { item: SideNavItem, onClose: () => void }) {

  const pathname = usePathname();

  const handleOnClose = () => {
    onClose()
  };

  return (
    <div className="relative group">
      <Link
        href={path}
        onClick={handleOnClose}
        className={`hover:relative group flex flex-row gap-3 rounded px-3 items-center p-2 hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500 ${path === pathname ? 'bg-zinc-100' : ''}`}
      >
        {Icon && <Icon className="h-6 w-6 flex-shrink-0 text-zinc-500" />}
        <span
          className={classNames({
            "font-medium text-zinc-700 group-hover:text-violet-500": true,
            "lg:hidden": isCollapsed,
          })}>
          {title}
        </span>
      </Link >
      {isCollapsed &&
        <div
          className={classNames({
            "absolute shadow-lg bg-[#333] hidden lg:group-hover:block text-white font-semibold px-3 py-[6px] text-[13px] right-0 left-14 w-max top-1 rounded": true,
          })}>
          {title}
        </div>
      }
    </div>
  )
}


