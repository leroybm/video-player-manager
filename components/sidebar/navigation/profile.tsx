import { LogOut } from "lucide-react"
import classNames from "classnames"
import Image from "next/image"
import { Button } from "@/components/button"

export interface ProfileProps {
  isCollapsed: boolean
}

export function Profile({ isCollapsed }: ProfileProps) {
  return (
    <div
      className={classNames({
        "flex h-11 items-center gap-4 overflow-hidden": true,
        "lg:flex-col": isCollapsed,
      })}>
      <Image
        src="https://avatars.githubusercontent.com/u/13338262?v=4" // Temporary placeholder URL
        width={40}
        height={40}
        className="h-10 w-10 cursor-pointer rounded-full"
        alt="User avatar"
      />
      <div
        className={classNames({
          "flex flex-col": true,
          "lg:hidden": isCollapsed,
        })}>
        <span className="block text-sm font-semibold text-zinc-700">
          John Doe
        </span>
        <span className="block text-sm text-zinc-500">john.doe@ustwo.com</span>
      </div>
      <Button
        variant="ghost"
        aria-label="Log Out"
        className="ml-auto">
        <LogOut className="h-5 w-5 text-zinc-500" />
      </Button>
    </div>
  )
}
