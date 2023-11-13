export const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    HEAD: 'HEAD',
    PUT: 'PUT',
    DELETE: 'DELETE',
    CONNECT: 'CONNECT',
    OPTIONS: 'OPTIONS',
    TRACE: 'TRACE',
    PATCH: 'PATCH',
} as const

export type HttpMethod = (typeof HttpMethods)[keyof typeof HttpMethods]