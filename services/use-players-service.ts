import { create } from "zustand"
import { useAlertService } from "./use-alert-service"
import { useFetch } from "@/lib/client"
import { IPlayer, IPlayerService, IPlayerStore } from "@/types/player"

export { usePlayerService }

// player state store
const initialState: IPlayerStore = {
  players: undefined,
  player: undefined,
  currentPlayer: undefined,
}
const playerStore = create<IPlayerStore>(() => initialState)

function usePlayerService(): IPlayerService {
  const alertService = useAlertService()
  const fetch = useFetch()
  const { currentPlayer, player, players } = playerStore()

  return {
    players,
    player,
    currentPlayer,
    getPaginated: async (offset: number) => {
      playerStore.setState({
        players: await fetch.get(`/api/players?offset=${offset}`),
      })
    },
    getById: async (id: string) => {
      playerStore.setState({ player: undefined })
      try {
        const player = await fetch.get(`/api/players/${id}`)
        playerStore.setState({ player })
      } catch (error: unknown) {
        alertService.error(error)
      }
    },
    create: async (player: IPlayer) => {
      await fetch.post("/api/players", player)
    },
    update: async (id: string, params: Partial<IPlayer>) => {
      await fetch.put(`/api/players/${id}`, params)
    },
    delete: async (id: string) => {
      // set isDeleting prop to true on player
      playerStore.setState({
        players: players!.map((x) => {
          if (x.id === id) {
            x.isDeleting = true
          }
          return x
        }),
      })

      // remove deleted player from state
      playerStore.setState({ players: players!.filter((x) => x.id !== id) })
    },
  }
}
