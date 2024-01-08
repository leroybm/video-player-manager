import Link from "next/link"
import { Pagination } from "@/components/pagination"
import { PlayersList } from "@/components/players-list"
import { IPlayer } from "@/types"

export default async function Players({
  searchParams,
}: {
  searchParams: { page: number }
}) {
  let players: IPlayer[] = []

  if (searchParams.page > 0) {
    players = await (
      await fetch(
        `http://localhost:3000/api/players?offset=${searchParams.page}`
      )
    ).json()
  }

  const playersCount = await (
    await fetch(`http://localhost:3000/api/players/count`)
  ).json()

  return (
    <>
      <h1>Video Players Pass</h1>
      <Link href="/players/add">Create New</Link>

      {players.length ?
        <>
          <PlayersList players={players} />
          <Pagination playersCount={playersCount} />
        </>
      : <h1>No Players To Display</h1>}
    </>
  )
}
