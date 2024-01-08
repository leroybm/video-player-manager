"use client"

import { useFormContext } from "react-hook-form"
import { FluidPlayerWrapper } from "./player/fluid-player-wrapper"
import { ConfiguratorOptions } from "@/types/configurator-options"

export function PlayerPreview() {
  const { getValues } = useFormContext<ConfiguratorOptions>()

  const { playerConfiguration, sources } = getValues()

  if (!playerConfiguration || !sources?.[0]?.url) {
    return (
      <p className="mt-3 text-sm">
        Preview not possible at this time due to an invalid configuration.
      </p>
    )
  }

  return (
    <div className="aspect-video w-full">
      <FluidPlayerWrapper
        source={sources[0].url}
        configuration={playerConfiguration}
      />
    </div>
  )
}
