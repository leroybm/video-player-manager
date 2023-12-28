import { omit } from "lodash"
import { AdOptions, ExtendedFluidPlayerOptions } from "@/models"

/**
 * Transforms values from the data types that work well with the form, to the
 * data types that Fluid Player accepts.
 */
export function transformFluidPlayerConfiguration(
  options: Partial<ExtendedFluidPlayerOptions>
): Partial<ExtendedFluidPlayerOptions> {
  if (typeof options.onBeforeXMLHttpRequestOpen === "string") {
    options.onBeforeXMLHttpRequestOpen = new Function(
      "return " + options.onBeforeXMLHttpRequestOpen
    )() as (request: XMLHttpRequest) => void
  }

  if (
    options?.vastOptions?.adList &&
    Array.isArray(options?.vastOptions?.adList)
  ) {
    options.vastOptions.adList = options.vastOptions.adList.map((ad) => {
      if (
        typeof ad.fallbackVastTags === "string" &&
        ad.fallbackVastTags !== ""
      ) {
        ad.fallbackVastTags = (ad.fallbackVastTags as string).split(",")
      }

      Object.keys(ad).forEach((key) => {
        if (ad[key as keyof AdOptions] === "") {
          delete ad[key as keyof AdOptions]
        }
      })

      return omit(ad, ["id", "_id"])
    }) as typeof options.vastOptions.adList
  }

  return options
}
