import { SIDENAV_ITEMS } from "../constants"
import { NavItem } from "./nav-item"

interface NavigationProps {
  isCollapsed: boolean
  onClose: () => void
}

export function Navigation({ onClose, isCollapsed }: NavigationProps) {
  return (
    <nav className="flex flex-col gap-0.5">
      {SIDENAV_ITEMS.map((item, index) => {
        return (
          <NavItem
            key={index}
            item={item}
            onClose={onClose}
            isCollapsed={isCollapsed}
          />
        )
      })}
    </nav>
  )
}
