import { ObjectId } from "mongodb"
import { normalizeFluidPlayerConfiguration } from "../utils/normalizeFluidPlayerConfiguration"
import { db } from "./db"
import { ExtendedFluidPlayerOptions, IPlayer } from "@/types"
import { defaultValues } from "@/constants"

const Player = db.VideoPlayer

export const playersRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}

/**
 * Data transformation for storing Fluid Player in the correct format as defined
 * by the documentation.
 */
function preFormatPlayerConfiguration(
  playerConfiguration: Partial<ExtendedFluidPlayerOptions> | undefined
): Partial<ExtendedFluidPlayerOptions> {
  return normalizeFluidPlayerConfiguration(
    playerConfiguration || {},
    defaultValues
  )
}

async function getAll() {
  return await Player.find()
}

async function getById(id: string) {
  try {
    return await Player.findById(id)
  } catch {
    throw "Player Not Found"
  }
}

async function create(params: IPlayer) {
  // validate
  if (await Player.findOne({ title: params.title })) {
    throw 'Player "' + params.title + '" is already taken'
  }

  params.playerConfiguration = preFormatPlayerConfiguration(
    params.playerConfiguration
  )

  const player = new Player(params)

  await player.save()
}

async function update(id: string, params: Partial<IPlayer>) {
  const player = await Player.findById(id)

  // validate
  if (!player) throw "Player not found"
  if (
    player.title !== params.title &&
    (await Player.findOne({ title: params.title }))
  ) {
    throw 'Title "' + params.title + '" is already taken'
  }

  params.playerConfiguration = preFormatPlayerConfiguration(
    params.playerConfiguration
  )

  // copy params properties to user
  Object.assign(player, params)

  await player.save()
}

async function _delete(id: string) {
  await Player.findOneAndDelete({ _id: new ObjectId(id) })
}
