import Fastify, {type FastifyServerOptions} from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import dotenv from 'dotenv';
import {ROUTES} from "./shared/const/routes.js";
import heartbeatRoutes from "./modules/heartbeat/heartbeat.route.js";
import companyRoutes from "./modules/company/company.route.js";
import cityRoutes from "./modules/city/city.route.js";
import regionRoutes from "./modules/region/region.route.js";
import departmentRoutes from "./modules/department/department.route.js";
import positionRoutes from "./modules/position/position.route.js";
import userRoutes from "./modules/user/user.route.js";
import {swaggerConfig} from "./shared/config/swagger.js";
import {swaggerUIConfig} from "./shared/config/swagger-ui.js";

dotenv.config();

export function buildApp(options: Partial<FastifyServerOptions> = {}) {
  const fastify = Fastify({
    logger: true,   // можно отключать в тестах
    ...options
  })

  fastify.register(swagger, swaggerConfig);

  fastify.register(swaggerUi, swaggerUIConfig);

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })

  fastify.register(heartbeatRoutes, {prefix: ROUTES.HEARTBEAT})           // heartbeat routes
  fastify.register(cityRoutes, {prefix: ROUTES.CITY})                     // city routes
  fastify.register(regionRoutes, {prefix: ROUTES.REGION})                 // region routes
  fastify.register(companyRoutes, {prefix: ROUTES.COMPANY})               // company routes
  fastify.register(departmentRoutes, {prefix: ROUTES.DEPARTMENT})         // department routes
  fastify.register(positionRoutes, {prefix: ROUTES.POSITION})             // position routes
  fastify.register(userRoutes, {prefix: ROUTES.USER})                     // user routes

  return fastify;
}
