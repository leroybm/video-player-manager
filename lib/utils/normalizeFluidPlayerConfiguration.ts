import { isObject } from "lodash"

type GenericObject = { [key: string]: unknown }

/**
 * Recursively changes every value of the Fluid Player configuration object by
 * checking if it's empty and changing it to the default value.
 */
export function normalizeFluidPlayerConfiguration(
  configuration: GenericObject,
  defaultValues: GenericObject
) {
  Object.keys(configuration).forEach((property) => {
    if (isObject(configuration[property]) && defaultValues[property]) {
      configuration[property] = normalizeFluidPlayerConfiguration(
        configuration[property] as GenericObject,
        defaultValues[property] as GenericObject
      )
    } else if (configuration[property] === "") {
      configuration[property] = defaultValues[property]
    }
  })

  return configuration
}
