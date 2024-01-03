import { FluidPlayerWrapper } from "@/components/player";
import { ConfiguratorOptions } from "@/models/index";
import { Metadata } from "next";

export const metadata: Metadata = {};

const VideoNotAvailable = <div className="flex justify-center items-center h-full">Video Not Available</div>

export default async function EmbeddedVideo({ params }:  { params: { id: string } }) {
    const { id } = params;
    let player: ConfiguratorOptions | undefined;

    try {
        const response = await fetch(`${process.env.NEXTJS_API_BASE_URL}/api/players/${id}`);
        player = await  response.json();
    } catch (error) {
        return VideoNotAvailable;
    }

    if (!player?.playerConfiguration) return VideoNotAvailable;

    player.playerConfiguration.layoutControls = {
        ...(player.playerConfiguration?.layoutControls || {}),
        fillToContainer: true
    };

    metadata.title = `Embedded Video - ${player.title}`

    return (
      <div className="w-full h-full">
        <FluidPlayerWrapper
            source={player.sources[0].url}
            configuration={player.playerConfiguration}
        />
      </div>
    );
}