/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { validateMiddleware } from "./validate-middleware"
import { errorHandler } from "./error-handler"

export { apiHandler }

function apiHandler(handler: any) {
  // TODO: Possible refactor to apiHandler mechanism
  const wrappedHandler: any = {}
  const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"]

  // wrap handler methods to add middleware and global error handler
  httpMethods.forEach((method) => {
    if (typeof handler[method] !== "function") return
    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        // global middleware
        await validateMiddleware(req, handler[method].schema)

        // route handler
        const responseBody = await handler[method](req, ...args)

        return NextResponse.json(responseBody || {})
      } catch (err: unknown) {
        // global error handler

        return errorHandler(err)
      }
    }
  })

  return wrappedHandler
}
