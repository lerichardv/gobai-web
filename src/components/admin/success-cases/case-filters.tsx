"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Globe, Filter, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

export function CaseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || "")
  const debouncedSearch = useDebounce(search, 500)
  
  const currentLanguage = searchParams.get('language') || 'all'
  const currentStatus = searchParams.get('status') || 'all'
  
  const hasFilters = !!(searchParams.get('search') || searchParams.get('language') || searchParams.get('status'))

  const updateFilters = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([name, value]) => {
      if (!value || value === 'all' || value === '') {
        params.delete(name)
      } else {
        params.set(name, value)
      }
    })
    
    params.delete('page')
    const query = params.toString()
    router.push(`/admin/success-cases${query ? `?${query}` : ''}`)
  }, [router, searchParams])

  useEffect(() => {
    const currentSearch = searchParams.get('search') || ""
    if (debouncedSearch !== currentSearch) {
      updateFilters({ search: debouncedSearch })
    }
  }, [debouncedSearch, searchParams, updateFilters])

  useEffect(() => {
    setSearch(searchParams.get('search') || "")
  }, [searchParams])

  const clearFilters = () => {
    setSearch("")
    router.push('/admin/success-cases')
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-gobai-cyan transition-colors" />
        <Input
          placeholder="Buscar por título, slug o etiqueta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/5 border-white/10 text-white pl-11 h-11 focus:border-gobai-cyan transition-all rounded-xl"
        />
        {search && (
          <button 
            type="button"
            onClick={() => {
              setSearch("")
              updateFilters({ search: null })
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      
      <div className="flex gap-4 flex-wrap items-center">
        <div className="relative group">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-gobai-cyan transition-colors pointer-events-none" />
          <select
            value={currentLanguage}
            onChange={(e) => updateFilters({ language: e.target.value })}
            className="bg-white/5 border border-white/10 text-white pl-11 pr-10 h-11 rounded-xl text-sm appearance-none focus:outline-none focus:border-gobai-cyan focus:ring-1 focus:ring-gobai-cyan/20 transition-all cursor-pointer min-w-[180px]"
          >
            <option value="all" className="bg-[#0a0a0a]">Todos los idiomas</option>
            <option value="es" className="bg-[#0a0a0a]">Español</option>
            <option value="en" className="bg-[#0a0a0a]">English</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative group">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-gobai-cyan transition-colors pointer-events-none" />
          <select
            value={currentStatus}
            onChange={(e) => updateFilters({ status: e.target.value })}
            className="bg-white/5 border border-white/10 text-white pl-11 pr-10 h-11 rounded-xl text-sm appearance-none focus:outline-none focus:border-gobai-cyan focus:ring-1 focus:ring-gobai-cyan/20 transition-all cursor-pointer min-w-[180px]"
          >
            <option value="all" className="bg-[#0a0a0a]">Todos los estados</option>
            <option value="published" className="bg-[#0a0a0a]">Publicados</option>
            <option value="draft" className="bg-[#0a0a0a]">Borradores</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {hasFilters && (
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="h-11 px-6 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar Filtros
          </Button>
        )}
      </div>
    </div>
  )
}
