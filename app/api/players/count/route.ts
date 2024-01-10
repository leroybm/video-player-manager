import { playersRepo } from "@/lib/server"
import { apiHandler } from "@/lib/server/api"

const handlers = apiHandler({
  GET: getPlayersCount,
})

export const { GET } = handlers

async function getPlayersCount() {
  return await playersRepo.count()
}
