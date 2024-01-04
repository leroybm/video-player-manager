import { Metadata } from "next"
import { notFound } from "next/navigation"
import { FluidPlayerWrapper } from "@/components/player"
import { ConfiguratorOptions } from "@/types"

export const metadata: Metadata = {}

export default async function EmbeddedVideo({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  let player: ConfiguratorOptions | undefined

  try {
    const response = await fetch(
      `${process.env.NEXTJS_API_BASE_URL}/api/players/${id}`
    )
    player = await response.json()
  } catch (error) {
    return notFound()
  }

  if (!player?.playerConfiguration) return notFound()

  player.playerConfiguration.layoutControls = {
    ...(player.playerConfiguration?.layoutControls || {}),
    // Overrides saved configurations that don't work inside iframes
    fillToContainer: true,
    miniPlayer: {
      enabled: false,
    },
    allowTheatre: false,
  }

  metadata.title = `Embedded Video - ${player.title}`

  return (
    <div className="w-full h-full">
      <FluidPlayerWrapper
        source={player.sources[0].url}
        configuration={player.playerConfiguration}
      />
    </div>
  )
}
