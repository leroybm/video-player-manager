import { isObject } from "lodash"

type GenericObject = { [key: string]: unknown }

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
