"use client"

import 'globals.css';
import { Sidebar } from '../components/sidebar';
import { useState } from 'react';
import classNames from 'classnames';
import { Alert } from '../components/Alert';

export default function Rootlayout({
  children
}: {
  children: React.ReactNode
}) {

  const [collapsed, setSidebarCollapsed] = useState(false);

  return (
    <html lang="en">
      <body>
        <div
          className={classNames({
            "lg:grid min-h-screen overflow-hidden relative": true,
            "lg:grid-cols-app": !collapsed,
            "lg:grid-cols-collapsed": collapsed,
            "transition-[grid-template-columns] duration-300 ease-in-out": true,
          })}
        >
          <Alert />
          <Sidebar setSidebarCollapsed={setSidebarCollapsed} isCollapsed={collapsed} />
          <main className="max-w-screen px-4 pb-12 pt-24 space-y-2 lg:col-start-2 lg:w-auto lg:px-6 lg:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
