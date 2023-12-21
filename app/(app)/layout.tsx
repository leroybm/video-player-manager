"use client"

import { useState } from 'react';
import classNames from 'classnames';
import { Sidebar } from '@/components/sidebar';

export default function AppLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

  const [collapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
        className={classNames({
        "lg:grid min-h-screen": true,
        "lg:grid-cols-app": !collapsed,
        "lg:grid-cols-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
    >
        <Sidebar setSidebarCollapsed={setSidebarCollapsed} isCollapsed={collapsed} />
        <main className="max-w-screen px-4 pb-12 pt-24 space-y-2 lg:col-start-2 lg:w-auto lg:px-6 lg:pt-8">
        {children}
        </main>
    </div>
  );
}