import { ExtendedFluidPlayerOptions } from "@/types"

export const defaultValues: Partial<ExtendedFluidPlayerOptions> = {
  layoutControls: {
    primaryColor: "",
    posterImage: "",
    playButtonShowing: true,
    playPauseAnimation: true,
    fillToContainer: false,
    autoPlay: false,
    preload: "auto",
    mute: false,
    doubleclickFullscreen: true,
    subtitlesEnabled: false,
    keyboardControl: true,
    title: "",
    loop: false,
    playbackRateEnabled: false,
    logo: {
      imageUrl: null,
      position: "top left",
      clickUrl: null,
      opacity: 1,
      mouseOverImageUrl: null,
      imageMargin: "2px",
      hideWithControls: false,
      showOverAds: false,
    },
    controlBar: {
      autoHide: false,
      autoHideTimeout: 3,
      animated: true,
      playbackRates: ["x2", "x1.5", "x1", "x0.5"],
    },
    timelinePreview: {
      type: "static",
      frames: [
        // TODO: Fix this ASAP
        // @ts-expect-error ts(2322) This is an internal control value
        {
          startTime: 5,
          endTime: 10,
          image: "https://placekitten.com/320/180",
          y: 0,
          x: 0,
          w: 0,
          h: 0,
        },
      ],
    },
    miniPlayer: {
      enabled: true,
      width: 400,
      height: 225,
      widthMobile: 40,
      placeholderText: "Playing in Miniplayer",
      position: "bottom right",
      autoToggle: false,
    },
  },
}
