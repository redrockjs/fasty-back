import Fastify from 'fastify'
import dotenv from 'dotenv';
import {ROUTES} from "./shared/const/routes.js";
import heartbeatRoutes from "./modules/heartbeat/heartbeat.route.js";
import companyRoutes from "./modules/company/company.route.js";
import cityRoutes from "./modules/city/city.route.js";
import regionRoutes from "./modules/region/region.route.js";
import departmentRoutes from "./modules/department/department.route.js";
import positionRoutes from "./modules/position/position.route.js";
import userRoutes from "./modules/user/user.route.js";

dotenv.config();
const APP_PORT = Number(process.env.APP_PORT);

const fastify = Fastify({
  logger: true
})

async function main() {
  fastify.register(heartbeatRoutes, {prefix: ROUTES.HEARTBEAT})           // heartbeat routes
  fastify.register(cityRoutes, {prefix: ROUTES.CITY})                     // city routes
  fastify.register(regionRoutes, {prefix: ROUTES.REGION})                 // region routes
  fastify.register(companyRoutes, {prefix: ROUTES.COMPANY})               // company routes
  fastify.register(departmentRoutes, {prefix: ROUTES.DEPARTMENT})         // department routes
  fastify.register(positionRoutes, {prefix: ROUTES.POSITION})             // position routes
  fastify.register(userRoutes, {prefix: ROUTES.USER})                    // user routes

  try {
    await fastify.listen({port: APP_PORT})
    fastify.log.info(`Server listening at http://localhost:${APP_PORT}}`)

  } catch (error) {
    fastify.log.error(error)
    process.exit(1);    // exit as failure
  }
}

main().finally()