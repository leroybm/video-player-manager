"use client"

import { Navigation } from "./navigation";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Logo } from "./logo";
import * as Collapsible from "@radix-ui/react-collapsible"
import { Button } from "../Button";
import { Profile } from "./navigation/Profile";
import { useState } from "react";
import classNames from "classnames";

export function Sidebar({ setSidebarCollapsed, isCollapsed }) {

  const [open, setOpen] = useState(false);

  const Icon = isCollapsed ? ChevronRight : ChevronLeft

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Collapsible.Root
      open={open}
      role="navigation"
      aria-label="Sidebar menu"
      onOpenChange={setOpen}
      className={classNames({
        "flex flex-col fixed left-0 right-0 top-0 z-20 gap-3 border-b border-zinc-200 bg-white p-4 scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:border-b-0 lg:border-r lg:py-8": true,
        "lg:w-80": !isCollapsed,
        "lg:flex-col": isCollapsed
      })}
    >
      <div className={classNames({
        "flex items-center justify-between gap-3": true,
        "lg:flex-col": isCollapsed
      })}>
        <Logo isCollapsed={isCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        {!isCollapsed &&
          <Button
            aria-label="Collapse horizontal navigation"
            variant="ghost"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="hidden lg:block"
          >
            <Icon className="h-5 w-5 text-zinc-500" />
          </Button>
        }
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost" aria-label="Hamburguer menu">
            <Menu className="h-5 w-5 text-zinc-500" />
          </Button>
        </Collapsible.Trigger>
      </div >
      <div className="hidden lg:block h-px gap-2 bg-zinc-200" />
      <Collapsible.Content
        asChild
        forceMount
        className="data-[state=closed]:hidden data-[state=closed]:animate-slideUpAndFade data-[state=open]:animate-slideDownAndFade lg:data-[state=closed]:flex"
      >
        <div className="flex flex-1 flex-col gap-3">
          <Navigation onClose={handleClose} isCollapsed={isCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
          <div className="mt-auto flex flex-col gap-3">
            <div className="h-px gap-2 bg-zinc-200" />
            <Profile isCollapsed={isCollapsed} />
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root >
  )
}