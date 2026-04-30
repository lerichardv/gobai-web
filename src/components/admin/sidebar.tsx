"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Bell,
  Menu,
  Globe,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"

const navItems = [
  {
    title: "Panel de Control",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Usuarios",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: Globe,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <Sidebar className="border-r border-white/10 bg-[#00040a] text-white">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white/5 p-1 border border-white/10">
            <Image
              src="/img/gobai-blue-gradient-logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-gobai-blue-light to-gobai-cyan bg-clip-text text-transparent">
              Gobai
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
              Panel de Administración
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 px-4 py-2 text-[10px] uppercase font-bold">
            Menú Principal
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.includes(item.href)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
                    ${pathname.includes(item.href) 
                      ? "bg-gradient-to-r from-gobai-blue-dark/40 to-gobai-cyan/10 text-gobai-cyan border-l-2 border-gobai-cyan" 
                      : "text-white/60 hover:text-white hover:bg-white/5"}
                  `}
                >
                  <Link href={item.href}>
                    <item.icon className={`w-5 h-5 ${pathname.includes(item.href) ? "text-gobai-cyan" : ""}`} />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-white/10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-full justify-start gap-3 h-12 hover:bg-white/5 transition-colors">
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-gobai-blue-dark text-white text-xs">
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-sm font-semibold truncate w-full text-white">
                  {session?.user?.name || "Usuario"}
                </span>
                <span className="text-xs text-white/40 truncate w-full">
                  {session?.user?.email || "usuario@ejemplo.com"}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] bg-[#0a0a0a] border-white/10 text-white" align="start">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem asChild className="hover:bg-white/5 cursor-pointer">
              <Link href="/admin/profile" className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-red-500/10 text-red-400 cursor-pointer"
              onClick={async () => {
                toast.success("Sesión cerrada exitosamente")
                await signOut({ callbackUrl: "/auth/login" })
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
