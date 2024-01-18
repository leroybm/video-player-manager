import { isObject } from "./type-validation"

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
