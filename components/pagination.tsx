"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { LIMIT, MIN_PAGE_NUMBER } from "@/constants/pagination"

interface PaginationProps {
  totalCount: number
}

export function Pagination({ totalCount }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page")) ?? 1
  const totalPages = Math.ceil(totalCount / LIMIT)

  const hasPrevPage = currentPage > MIN_PAGE_NUMBER
  const hasNextPage = currentPage < totalPages

  const showPlayersFrom = LIMIT * (currentPage - 1) + 1
  const showPlayersTo = LIMIT * currentPage

  const startIndex = currentPage === 1 ? 1 : showPlayersFrom
  const endIndex = showPlayersTo < totalCount ? showPlayersTo : totalCount

  const onPrevPage = () => {
    if (hasPrevPage) {
      router.push(`?page=${currentPage - 1}`)
    }
  }

  const onNextPage = () => {
    if (hasNextPage) {
      router.push(`?page=${currentPage + 1}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700">
        Showing
        <span className="font-semibold text-gray-900">{startIndex}</span>
        to
        <span className="font-semibold text-gray-900">{endIndex}</span>
        of
        <span className="font-semibold text-gray-900">{totalCount}</span>
        Entries
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <button
          disabled={!hasPrevPage}
          onClick={onPrevPage}
          className={`flex h-8 items-center justify-center rounded-s border-gray-700 bg-gray-800 px-3 text-sm font-medium text-gray-400 ${
            hasPrevPage && "hover:bg-gray-700 hover:text-white"
          }`}>
          Prev
        </button>
        <button
          disabled={!hasNextPage}
          onClick={onNextPage}
          className={`flex h-8 items-center justify-center rounded-e border-gray-700 bg-gray-800 px-3 text-sm font-medium text-gray-400 ${
            hasNextPage && "hover:bg-gray-700 hover:text-white"
          }`}>
          Next
        </button>
      </div>
    </div>
  )
}
