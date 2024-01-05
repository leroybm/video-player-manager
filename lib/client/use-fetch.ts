import { IPlayer } from "@/types/player"

export { useFetch }

function useFetch() {
  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  }

  function request(method: string) {
    return async (url: string, body?: Partial<IPlayer>) => {
      const requestOptions: RequestInit = {
        method,
      }
      if (body) {
        requestOptions.headers = { "Content-Type": "application/json" }
        requestOptions.body = JSON.stringify(body)
      }
      const response = await fetch(url, requestOptions)

      return handleResponse(response)
    }
  }

  // helper functions

  async function handleResponse(response: Response) {
    const isJson = response.headers
      ?.get("content-type")
      ?.includes("application/json")
    const data = isJson ? await response.json() : null

    // check for error response
    if (!response.ok) {
      if (response.status === 401) {
        // api auto logs out on 401 Unauthorized, so redirect to login page
        // router.push('/account/login');
      }

      // get error message from body or default to response status
      const error = (data && data.message) || response.statusText

      return Promise.reject(error)
    }

    return data
  }
}
