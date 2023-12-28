import { FileVideo, HelpCircle, Home } from "lucide-react"

export type SideNavItem = {
  title: string
  path: string
  icon?: React.ElementType
  submenu?: boolean
  subMenuItems?: SideNavItem[]
  onClose?: () => void
}

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: Home,
  },
  {
    title: "Players",
    path: "/players",
    icon: FileVideo,
  },
  {
    title: "Help",
    path: "/help",
    icon: HelpCircle,
  },
]
