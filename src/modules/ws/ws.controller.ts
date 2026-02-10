import type {WebsocketHandler} from "@fastify/websocket";

export function socketHandler(socket: Parameters<WebsocketHandler>[0], request: Parameters<WebsocketHandler>[1]): ReturnType<WebsocketHandler> {
  socket.send("connected");

  socket.on("message", (msg) => {
    request.log.info(`💥 ${msg}`);
    socket.send(`echo: ${msg}`);
  });
}