import {ROUTES} from "../const/routes.js";
import type {FastifySwaggerUiOptions} from "@fastify/swagger-ui";

export const swaggerUIConfig:FastifySwaggerUiOptions = {
  routePrefix: ROUTES.API_DOCS,
  uiConfig: {
    docExpansion: "list", // expand/not all the documentations none|list|full
    deepLinking: true,
  },
}