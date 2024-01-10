import Link from "next/link"
import { Pagination } from "@/components/pagination"
import { PlayersList } from "@/components/players-list"
import { IPlayer } from "@/types"

const getPlayers = (page: number) =>
  fetch(`${process.env.NEXTJS_API_BASE_URL}/api/players?page=${page}`)

export default async function Players({
  searchParams,
}: {
  searchParams: { page: number }
}) {
  let players: IPlayer[] = []

  if (searchParams.page > 0) {
    players = await (await getPlayers(searchParams.page)).json()
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
          <Pagination totalCount={playersCount} />
        </>
      : <h1>No Players To Display</h1>}
    </>
  )
}
