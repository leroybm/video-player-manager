/**
 * A simple type guard for objects.
 *
 * @param obj - A possible object
 */
export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === "object" && obj !== null
}
