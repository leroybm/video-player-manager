import { getErrorMessage, isErrorLike, isObject } from "."

const ARRAY: unknown[] = []
const BOOLEAN = true
const FUNCTION = () => {}
const NULL = null
const NUMBER = 0
const OBJECT = {}
const STRING = ""
const UNDEFINED = undefined

class CLASS {} // `CLASS` is a function and `new CLASS()` is an Object

test("isObject returns true for objects only", () => {
  for (const item of [ARRAY, new CLASS(), OBJECT]) {
    expect(isObject(item)).toBe(true)
  }
  for (const item of [
    BOOLEAN,
    CLASS,
    FUNCTION,
    NULL,
    NUMBER,
    STRING,
    UNDEFINED,
  ]) {
    expect(isObject(item)).toBe(false)
  }
})

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
