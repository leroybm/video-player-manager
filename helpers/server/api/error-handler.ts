import { NextResponse } from "next/server"
import { getErrorMessage } from "@/lib/utils/errors"

export { errorHandler }

function errorHandler(err: unknown) {
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found")
    const status = is404 ? 404 : 400
    return NextResponse.json({ message: err }, { status })
  }

  // default to 500 server error
  return NextResponse.json({ message: getErrorMessage(err) }, { status: 500 })
}
