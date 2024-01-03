"use client";

import fluidPlayer from 'fluid-player'
import './fluid-player-wrapper.css';
import {useEffect, useRef} from "react";

export function FluidPlayerWrapper({ source, configuration }: FluidPlayerWrapperProps) {
    const videoTag = useRef<HTMLVideoElement>(null);
    let playerInstance: FluidPlayerInstance | null = null;

    useEffect(() => {
        if (!playerInstance && videoTag.current) {
            playerInstance = fluidPlayer(videoTag.current, configuration);
        }
    }, []);

    return <>
        <video ref={videoTag}>
            <source src={source} type="video/mp4" />
        </video>
    </>
}

interface FluidPlayerWrapperProps {
    source: string,
    configuration: Partial<FluidPlayerOptions>
}
