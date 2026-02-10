import type {RateLimitOptions} from "@fastify/rate-limit";

export const rateLimitConfig: RateLimitOptions = {
  max: 100,
  timeWindow: 1000 * 60 * 15, // milliseconds
  errorResponseBuilder: (request, context) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: `It allowed only ${context.max} requests per ${context.after} to this Website. Try again soon.`,
      date: Date.now(),
      expiresIn: context.ttl // milliseconds
    }
  }
}