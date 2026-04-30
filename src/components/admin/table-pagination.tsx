"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useSearchParams } from "next/navigation"

interface TablePaginationProps {
  totalPages: number
  currentPage: number
  baseUrl: string
}

export function TablePagination({ totalPages, currentPage, baseUrl }: TablePaginationProps) {
  const searchParams = useSearchParams()
  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    return `${baseUrl}?${params.toString()}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : "text-white hover:bg-white/5"}
            />
          </PaginationItem>
          
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink 
                href={createPageUrl(page)}
                isActive={currentPage === page}
                className={currentPage === page 
                  ? "bg-gobai-cyan text-white border-gobai-cyan" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext 
              href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "text-white hover:bg-white/5"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
