"use client"

import { useState } from "react"
import classNames from "classnames"
import { Sidebar } from "@/components/sidebar"
import { Alert } from "@/components/alert"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setSidebarCollapsed] = useState(false)

  return (
    <div
      className={classNames({
        "relative min-h-screen lg:grid": true,
        "lg:grid-cols-app": !collapsed,
        "lg:grid-cols-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}>
      <Alert />
      <Sidebar
        setSidebarCollapsed={setSidebarCollapsed}
        isCollapsed={collapsed}
      />
      <main className="max-w-screen space-y-2 px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-6 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
