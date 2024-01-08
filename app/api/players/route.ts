import joi from "joi"
import { playersRepo } from "@/lib/server"
import { apiHandler } from "@/lib/server/api"

const handlers = apiHandler({
  GET: getAll,
  POST: create,
})

export const { GET, POST } = handlers

async function getAll() {
  return await playersRepo.getAll()
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
