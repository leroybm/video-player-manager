import { getErrorMessage, isErrorLike } from "."

test("isErrorLike returns true when object is like an error", () => {
  expect(isErrorLike(new Error())).toBe(true)
  expect(isErrorLike({ message: "" })).toBe(true)
  expect(isErrorLike({})).toBe(false)
})

describe("errorToString", () => {
  const message = "message"
  test("return `message` when first argument is an error", () => {
    expect(getErrorMessage(new Error(message))).toStrictEqual(message)
  })
  test("returns `message` when first argument is error like", () => {
    expect(getErrorMessage({ message })).toStrictEqual(message)
  })
  test("returns first argument when it is a string", () => {
    expect(getErrorMessage(message)).toStrictEqual(message)
  })
  test("returns default fallback message when first argument is not an error, error like, nor a string, and the second argument is not provided", () => {
    expect(getErrorMessage(null)).toStrictEqual("An unknown error has ocurred.")
  })
})
