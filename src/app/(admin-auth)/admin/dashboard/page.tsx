import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  Activity, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Globe,
  FileText
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import { getAuthorDisplayName } from "@/lib/blog-utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default async function DashboardPage() {
  const [totalUsers, totalPosts, recentPosts, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { 
        author: { 
          select: { 
            name: true, 
            authorVisibility: true, 
            customAuthor: true,
            email: true 
          } 
        } 
      }
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { name: true, email: true, image: true, createdAt: true }
    })
  ])

  const stats = [
    {
      title: "Usuarios Totales",
      value: totalUsers.toString(),
      change: "+1",
      trend: "up",
      icon: Users,
      color: "text-gobai-cyan",
      bg: "bg-gobai-cyan/10"
    },
    {
      title: "Artículos Publicados",
      value: totalPosts.toString(),
      change: "+2",
      trend: "up",
      icon: FileText,
      color: "text-gobai-turquoise",
      bg: "bg-gobai-turquoise/10"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Resumen del Panel</h1>
        <p className="text-white/60">¡Bienvenido de nuevo! Esto es lo que está pasando en Gobai hoy.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {stats.map((stat, i) => (
          <Card key={i} className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/60">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs flex items-center mt-1">
                {stat.trend === "up" ? (
                  <span className="text-emerald-400 flex items-center mr-1">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    {stat.change}
                  </span>
                ) : stat.trend === "down" ? (
                  <span className="text-rose-400 flex items-center mr-1">
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="text-white/40 mr-1">{stat.change}</span>
                )}
                <span className="text-white/40">desde el mes pasado</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Artículos Recientes</CardTitle>
              <p className="text-xs text-white/40">Últimas publicaciones del blog.</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-gobai-cyan hover:bg-gobai-cyan/10">
              <Link href="/admin/blog">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.length === 0 ? (
                <p className="text-center py-8 text-white/20">No hay artículos todavía.</p>
              ) : (
                recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                    <div className="h-10 w-10 rounded-lg bg-gobai-cyan/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-gobai-cyan" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-gobai-cyan transition-colors">
                        {post.title}
                      </p>
                      <p className="text-xs text-white/40 flex items-center gap-2">
                        Por {getAuthorDisplayName(post.author)} • {new Date(post.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-white/40 group-hover:text-white transition-colors">
                      {post.published ? 'Publicado' : 'Borrador'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-white/10 bg-white/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Nuevos Usuarios</CardTitle>
              <p className="text-xs text-white/40">Miembros recientes del equipo.</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-gobai-cyan hover:bg-gobai-cyan/10">
              <Link href="/admin/users">Gestionar</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentUsers.length === 0 ? (
                <p className="text-center py-8 text-white/20">No hay usuarios registrados.</p>
              ) : (
                recentUsers.map((user) => (
                  <div key={user.email} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-white/10">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback className="bg-gobai-blue-dark text-white text-xs font-bold uppercase">
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{user.name || 'Sin nombre'}</p>
                      <p className="text-xs text-white/40 truncate">{user.email}</p>
                    </div>
                    <div className="text-[10px] text-white/20 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
