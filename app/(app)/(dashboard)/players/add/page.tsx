import { AddEdit } from "@/components/player"
import { defaultValues } from "@/constants/fluid-player-configs"

export default Add

function Add() {
  return (
    <AddEdit
      title="Add Player"
      player={{
        title: "",
        sources: [{ label: "Default", url: "" }],
        playerConfiguration: defaultValues,
      }}
    />
  )
}
