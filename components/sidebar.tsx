"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Add the theme toggle imports at the top of the file
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Pacientes",
    href: "/pacientes",
    icon: Users,
  },
  {
    title: "Agenda",
    href: "/agenda",
    icon: Calendar,
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: FileText,
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
]

// Update the Sidebar component to include the theme toggle
export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { theme, setTheme } = useTheme()

  // Detecta se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verifica inicialmente
    checkIfMobile()

    // Adiciona listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Limpa o listener quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Em dispositivos móveis, o menu começa fechado
  useEffect(() => {
    setIsCollapsed(isMobile)
  }, [isMobile])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Botão de toggle para dispositivos móveis */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background border-r transform transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[70px]" : "w-64",
          isMobile && isCollapsed ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Cabeçalho */}
          <div className="flex h-14 items-center border-b px-4 justify-between">
            <Link
              href="/dashboard"
              className={cn("flex items-center gap-2 font-semibold", isCollapsed && !isMobile && "justify-center")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              {!isCollapsed && <span>MediSystem</span>}
            </Link>

            {/* Botão de toggle para desktop */}
            {!isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            )}
          </div>

          {/* Links de navegação */}
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                    pathname === link.href ? "bg-muted font-medium" : "text-muted-foreground",
                    isCollapsed && !isMobile && "justify-center px-0",
                  )}
                  title={isCollapsed ? link.title : undefined}
                >
                  <link.icon className="h-4 w-4" />
                  {!isCollapsed && <span>{link.title}</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Theme Toggle */}
          <div className="border-t py-2 px-2">
            <Button
              variant="ghost"
              size={isCollapsed && !isMobile ? "icon" : "sm"}
              onClick={toggleTheme}
              className={cn("w-full", isCollapsed && !isMobile ? "justify-center" : "justify-start")}
              title="Alternar tema"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-2">Tema claro</span>}
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-2">Tema escuro</span>}
                </>
              )}
            </Button>
          </div>

          {/* Perfil do usuário */}
          <div className="mt-auto border-t p-4">
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2",
                isCollapsed && !isMobile && "justify-center px-0 flex-col",
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-medium text-primary">DR</span>
              </div>
              {!isCollapsed && (
                <div>
                  <p className="text-sm font-medium">Dr. Ricardo</p>
                  <p className="text-xs text-muted-foreground">Cardiologista</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Button variant="outline" className="mt-2 w-full justify-start" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            )}
            {isCollapsed && !isMobile && (
              <Button variant="outline" className="mt-2 w-full justify-center" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

