"use client"

import Link from "next/link"
import { IPlayer } from "@/types"
import { usePlayerService } from "@/services"

interface PlayerListProps {
  players: IPlayer[]
}

export function PlayersList({ players }: PlayerListProps) {
  const playerService = usePlayerService()

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "30%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
        <TableBody />
      </tbody>
    </table>
  )

  function TableBody() {
    return players.map((player) => (
      <tr key={player.id}>
        <td>{player.title}</td>
        <td style={{ whiteSpace: "nowrap" }}>
          <Link href={`/players/edit/${player.id}`}>Edit</Link>
          <button
            onClick={() => playerService.delete(player.id)}
            style={{ width: "60px" }}
            disabled={player.isDeleting}>
            {player.isDeleting ?
              <span>Spinner</span>
            : <span>Delete</span>}
          </button>
        </td>
      </tr>
    ))
  }
}
