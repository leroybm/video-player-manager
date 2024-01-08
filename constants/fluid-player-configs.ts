import { ExtendedFluidPlayerOptions } from "@/types"

export const defaultValues: Partial<ExtendedFluidPlayerOptions> = {
  layoutControls: {
    playButtonShowing: true,
    playPauseAnimation: true,
    fillToContainer: true,
    autoPlay: false,
    preload: "auto",
    mute: false,
    doubleclickFullscreen: true,
    subtitlesEnabled: false,
    keyboardControl: true,
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
