import Fastify, {type FastifyServerOptions} from 'fastify'
import dotenv from 'dotenv';
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import jwt from '@fastify/jwt'
import multipart from "@fastify/multipart";
import {swaggerConfig} from "./shared/config/swagger.js";
import {swaggerUIConfig} from "./shared/config/swagger-ui.js";
import authPlugin from "./plugins/authPlugin.js";
import multipartPayloadPlugin from "./plugins/multipartPayloadPlugin.js";
import rateLimit from "@fastify/rate-limit"
import websocket from '@fastify/websocket'
import {ROUTES} from "./shared/const/routes.js";
import heartbeatRoutes from "./modules/heartbeat/heartbeat.route.js";
import companyRoutes from "./modules/company/company.route.js";
import cityRoutes from "./modules/city/city.route.js";
import regionRoutes from "./modules/region/region.route.js";
import departmentRoutes from "./modules/department/department.route.js";
import positionRoutes from "./modules/position/position.route.js";
import contactRoutes from "./modules/contact/contact.route.js";
import authRoutes from "./modules/auth/auth.route.js";
import {rateLimitConfig} from "./shared/config/ratelimit.js";
import {multipartConfig} from "./shared/config/multipart.js";
import eventsRoutes from "./modules/events/events.route.js";
import wsRoutes from "./modules/ws/ws.route.js";
import apiKeyGuardPlugin from "./plugins/apiKeyGuardPlugin.js";

dotenv.config();

export function buildApp(options: Partial<FastifyServerOptions> = {}) {
  const fastify = Fastify({
    logger: true,   // можно отключать в тестах
    ...options
  })

  // ✅ Swagger UI generation
  fastify.register(swagger, swaggerConfig);
  fastify.register(swaggerUi, swaggerUIConfig);
  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })

  // ✅ Authentification
  fastify.register(jwt, {secret: process.env.JWT_SECRET!})
  fastify.register(authPlugin)

  // ✅ Multipart
  fastify.register(multipart, multipartConfig);
  fastify.register(multipartPayloadPlugin);

  // ✅ Rate limiter
  fastify.register(rateLimit, rateLimitConfig)

  // ✅ Websocket
  fastify.register(websocket)
  fastify.register(apiKeyGuardPlugin)

  // ✅ Route registration
  fastify.register(heartbeatRoutes, {prefix: ROUTES.HEARTBEAT})           // heartbeat routes
  fastify.register(cityRoutes, {prefix: ROUTES.CITY})                     // city routes
  fastify.register(regionRoutes, {prefix: ROUTES.REGION})                 // region routes
  fastify.register(companyRoutes, {prefix: ROUTES.COMPANY})               // company routes
  fastify.register(departmentRoutes, {prefix: ROUTES.DEPARTMENT})         // department routes
  fastify.register(positionRoutes, {prefix: ROUTES.POSITION})             // position routes
  fastify.register(contactRoutes, {prefix: ROUTES.CONTACT})               // contact routes
  fastify.register(authRoutes, {prefix: ROUTES.AUTH})                     // auth routes
  fastify.register(eventsRoutes, {prefix: ROUTES.EVENTS})                 // events routes
  fastify.register(wsRoutes, {prefix: ROUTES.WS})                         // websocket routes
  return fastify;
}
