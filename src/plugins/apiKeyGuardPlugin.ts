import fp from "fastify-plugin";
import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

async function apiKeyGuardPlugin(fastify: FastifyInstance) {

  async function verifyApiKey(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const apiKey = request.headers['x-api-key'] || (request.query as any).api_key;
    if (!apiKey || apiKey !== process.env.WS_API_KEY) {
      return reply.code(401).send(reply.code(401).send({
        message: 'Unauthorized'
      }));
    }
  }

  fastify.decorate("verifyApiKey", verifyApiKey);
}

export default fp(apiKeyGuardPlugin);