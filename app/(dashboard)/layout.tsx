import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="w-[70px] md:w-64 shrink-0"></div>
      <main className="flex-1 overflow-y-auto bg-muted/20">{children}</main>
      <Sidebar />
    </div>
  )
}

