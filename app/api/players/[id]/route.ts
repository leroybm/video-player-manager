import joi from "joi"
import { apiHandler } from "@/lib/server/api"
import { playersRepo } from "@/lib/server"

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

interface Params {
  params: {
    id: string
  }
}

async function getById({ params: { id } }: Params) {
  return await playersRepo.getById(id)
}

async function update(req: Request, { params: { id } }: Params) {
  const body = await req.json()

  await playersRepo.update(id, {
    playerConfiguration: {},
    ...body,
  })
}

update.schema = joi.object({
  title: joi.string(),
  playerConfiguration: joi.object(),
  sources: joi.array().items(
    joi.object().keys({
      label: joi.string(),
      url: joi.string(),
    })
  ),
})

async function _delete({ params: { id } }: Params) {
  await playersRepo.delete(id)
}
