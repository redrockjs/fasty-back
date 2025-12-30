import type {FastifyReply, FastifyRequest} from "fastify";

export async function heartbeatHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    request.log.info('(!) Heartbeat check!');
    reply.code(200).send({message: 'Heartbeat is OK!'})
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({ message: "Something went wrong" });
  }
}