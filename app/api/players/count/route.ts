import { playersRepo } from "@/lib/server"
import { apiHandler } from "@/lib/server/api"

module.exports = apiHandler({
  GET: getPalayersCount,
})

async function getPalayersCount() {
  return await playersRepo.count()
}
