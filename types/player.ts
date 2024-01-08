import { ObjectId } from "mongodb"
import { ExtendedFluidPlayerOptions } from "./configurator-options"

export interface IPlayer {
  userId: ObjectId
  id: string
  title: string
  playerConfiguration: Partial<ExtendedFluidPlayerOptions>
  sources: { label: string; url: string }[]
  isDeleting?: boolean
}

export interface IPlayerStore {
  players?: IPlayer[]
  player?: IPlayer
  currentPlayer?: IPlayer
}

export interface IPlayerService extends IPlayerStore {
  getPaginated: (offset: number) => Promise<void>
  getById: (id: string) => Promise<void>
  create: (user: IPlayer) => Promise<void>
  update: (id: string, params: Partial<IPlayer>) => Promise<void>
  delete: (id: string) => Promise<void>
}
