"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { limit } from "@/constants/pagination"

interface PaginationProps {
  playersCount: number
}

export function Pagination({ playersCount }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page")) ?? 1
  const calculatePlayersFrom =
    currentPage === 1 ? 1 : limit * (currentPage - 1) + 1
  const calculatePlayersTo =
    limit * currentPage < playersCount ? limit * currentPage : playersCount

  const [showPlayersFrom, setShowPlayersFrom] = useState(calculatePlayersFrom)
  const [showPlayersTo, setShowPlayersTo] = useState(calculatePlayersTo)

  useEffect(() => {
    setShowPlayersFrom(calculatePlayersFrom)
    setShowPlayersTo(calculatePlayersTo)
  }, [currentPage])

  const onPrevPage = () => {
    if (currentPage != 1) {
      router.push(`?page=${currentPage - 1}`)
    }
  }

  const onNextPage = () => {
    if (currentPage != Math.ceil(playersCount / limit)) {
      router.push(`?page=${currentPage + 1}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700">
        Showing
        <span className="font-semibold text-gray-900">{showPlayersFrom}</span>
        to
        <span className="font-semibold text-gray-900">{showPlayersTo}</span>
        of
        <span className="font-semibold text-gray-900">{playersCount}</span>
        Entries
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <button
          onClick={onPrevPage}
          className="flex h-8 items-center justify-center rounded-s bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Prev
        </button>
        <button
          onClick={onNextPage}
          className="flex h-8 items-center justify-center rounded-e border-0 border-s border-gray-700 bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
        </button>
      </div>
    </div>
  )
}
