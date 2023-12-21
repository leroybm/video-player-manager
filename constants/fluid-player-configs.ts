import { ExtendedFluidPlayerOptions } from "@/models/index";

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
};

// export const completeConfiguration: Partial<ExtendedFluidPlayerOptions> = {
//   layoutControls: {
//     miniPlayer: {
//       enabled: true,
//       width: 400
//     },
//   },
//   onBeforeXMLHttpRequestOpen: (request: XMLHttpRequest) => console.log(request),
//   vastOptions: {
//     adList: [{
//       roll: "preRoll",
//       vastTag: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
//     }]
//   }
// };
