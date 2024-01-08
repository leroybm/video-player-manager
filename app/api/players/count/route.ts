import { playersRepo } from "@/lib/server"
import { apiHandler } from "@/lib/server/api"

const handlers = apiHandler({
  GET: getPalayersCount,
})

export const { GET } = handlers

async function getPalayersCount() {
  return await playersRepo.count()
}
