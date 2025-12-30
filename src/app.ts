import Fastify from 'fastify'
import dotenv from 'dotenv';
import companyRoutes from "./modules/company/company.route.js";
import heartbeatRoutes from "./modules/heartbeat/heartbeat.route.js";
import cityRoutes from "./modules/city/city.route.js";
import {ROUTES} from "./shared/const/routes.js";
import regionRoutes from "./modules/region/region.route.js";

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
  //fastify.register(departmentRoutes, { prefix: 'api/department' })      // department routes


  try {
    await fastify.listen({port: APP_PORT})
    fastify.log.info(`Server listening at http://localhost:${APP_PORT}}`)

  } catch (error) {
    fastify.log.error(error)
    process.exit(1);    // exit as failure
  }
}

main().finally()