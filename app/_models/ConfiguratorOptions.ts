import { FluidPlayerOptions, VTTPreviewOptions } from "./FluidPlayerConfiguration";

export interface ExtendedAdOptions {
  vastTag: string;
  roll: "preRoll" | "midRoll" | "postRoll" | "onPauseRoll";
  fallbackVastTags?: Array<string>;
  adText?: string;
  adTextPosition?: "top right" | "top left" | "bottom right" | "bottom left";
  adClickable?: boolean;
  vAlign?: "top" | "middle" | "bottom";
  nonLinearDuration?: number;
  size?: "468x60" | "300x250" | "728x90";
  timer?: number | string;
  _id: string;
}

interface MissingFluidPlayerOptions {
  layoutControls: Partial<{
    controlBar: Partial<{
      playbackRates: string[];
    }>;
    timelinePreview:
      | VTTPreviewOptions
      | {
          type: "static";
          frames: Array<{
            _id: string;
            startTime: number;
            endTime: number;
            image: string;
            x: number;
            y: number;
            w: number;
            h: number;
          }>;
        };
  }>;
  vastOptions: {
    adList: Array<ExtendedAdOptions>;
  };
}

export type ExtendedFluidPlayerOptions = FluidPlayerOptions & MissingFluidPlayerOptions;

export interface ConfiguratorOptions {
  options: Partial<ExtendedFluidPlayerOptions>;
  title: string;
  videoUrl: string;
}
