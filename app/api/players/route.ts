import joi from "joi"
import { playersRepo } from "@/lib/server"
import { apiHandler } from "@/lib/server/api"

interface Params {
  limit: number
  offset: number
}

module.exports = apiHandler({
  GET: getPaginated,
  POST: create,
})

async function getPaginated({ limit, offset }: Params) {
  return await playersRepo.getPaginated(limit, offset)
}

async function create(req: Request) {
  const body = await req.json()
  await playersRepo.create(body)
}

create.schema = joi.object({
  title: joi.string(),
  playerConfiguration: joi.object(),
  sources: joi.array().items(
    joi.object().keys({
      label: joi.string(),
      url: joi.string(),
    })
  ),
})
