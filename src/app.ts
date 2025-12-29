import Fastify from 'fastify'
import dotenv from 'dotenv';
import companyRoutes from "./modules/company/company.route.js";
import heartbeatRoutes from "./modules/heartbeat/heartbeat.route.js";

dotenv.config();
const APP_PORT = Number(process.env.APP_PORT);

const fastify = Fastify({
  logger: true
})


async function main() {

  fastify.register(heartbeatRoutes, {prefix: 'api/heartbeat'})           // heartbeat routes
  fastify.register(companyRoutes, {prefix: 'api/company'})               // company routes
  //fastify.register(departmentRoutes, { prefix: 'api/department' })           // department routes


  try {
    await fastify.listen({port: APP_PORT})
    fastify.log.info(`Server listening at http://localhost:${APP_PORT}}`)

  } catch (error) {
    fastify.log.error(error)
    process.exit(1);    // exit as failure
  }
}

main().finally()