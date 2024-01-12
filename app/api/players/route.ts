import joi from "joi"
import { playersRepo } from "@/lib/server"
import { apiHandler } from "@/lib/server/api"
import { LIMIT } from "@/constants/pagination"

const handlers = apiHandler({
  GET: getPaginated,
  POST: create,
})

export const { GET, POST } = handlers

async function getPaginated(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get("page"))
  const offset = (page - 1) * LIMIT

  return await playersRepo.getPaginated(offset)
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
