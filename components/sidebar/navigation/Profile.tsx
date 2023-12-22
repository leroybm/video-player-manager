import { LogOut } from 'lucide-react'
import { Button } from '@/components/button'
import classNames from 'classnames'

export interface ProfileProps { }

export function Profile({ isCollapsed }: { isCollapsed: any }) {
  return (
    <div className={classNames({
      "flex gap-4 items-center h-11 overflow-hidden": true,
      "lg:flex-col": isCollapsed
    })}>
      <img
        src="https://github.com/bertrindade.png"
        className="cursor-pointer h-10 w-10 rounded-full"
        alt="Profile Picture"
      />
      <div className={classNames({
        "flex flex-col": true,
        "lg:hidden": isCollapsed,
      })}>
        <span className="block text-sm font-semibold text-zinc-700">
          John Doe
        </span>
        <span className="block text-sm text-zinc-500">
          john.doe@ustwo.com
        </span>
      </div>
      <Button variant="ghost" aria-label="Log Out" className="ml-auto">
        <LogOut className="h-5 w-5 text-zinc-500" />
      </Button>
    </div>
  )
}

