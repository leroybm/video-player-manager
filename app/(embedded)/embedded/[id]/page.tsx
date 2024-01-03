import { FluidPlayerWrapper } from "@/components/player";
import { ConfiguratorOptions } from "@/models/index";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {};

export default async function EmbeddedVideo({ params }:  { params: { id: string } }) {
    const { id } = params;
    let player: ConfiguratorOptions | undefined;

    try {
        const response = await fetch(`${process.env.NEXTJS_API_BASE_URL}/api/players/${id}`);
        player = await  response.json();
    } catch (error) {
        return notFound();
    }

    if (!player?.playerConfiguration) return notFound();

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