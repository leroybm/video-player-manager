"use client"

import fluidPlayer from "fluid-player"
import "./fluid-player-wrapper.css"
import { useEffect, useRef } from "react"

interface FluidPlayerWrapperProps {
  source: string
  configuration: Partial<FluidPlayerOptions>
}

export function FluidPlayerWrapper({
  source,
  configuration,
}: FluidPlayerWrapperProps) {
  const videoTagRef = useRef<HTMLVideoElement>(null)
  const playerInstanceRef = useRef<FluidPlayerInstance | null>(null)

  useEffect(() => {
    if (!playerInstanceRef.current && videoTagRef.current) {
      if (configuration.layoutControls?.theatreAdvanced) {
        configuration.layoutControls.theatreAdvanced = {}
      }

      playerInstanceRef.current = fluidPlayer(
        videoTagRef.current,
        configuration
      )
    }
  }, [configuration])

  return (
    <video ref={videoTagRef}>
      <source
        src={source}
        type="video/mp4"
      />
    </video>
  )
}
