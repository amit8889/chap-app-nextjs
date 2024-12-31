import { createServer, IncomingMessage, ServerResponse } from "node:http";
import next from "next";
import { Server, Socket } from "socket.io";


const dev: boolean = process.env.NODE_ENV !== "production";
const hostname: string = "localhost";
const port: number = 3000;

// Create Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
    handler(req, res);
  });

  const io = new Server(httpServer);

  io.on("connection", (socket: Socket) => {
    //console.log("socket connected : =======>", socket.id);

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      socket.emit("joinRoom", "");
    });

    socket.on("message", (message: { roomId: string; text: string }) => {
     // console.log("message : ", message);
      const { roomId, text } = message;
      if (roomId) {
        socket.to(roomId).emit("message", text);
      }
    });

    socket.on("leaveRoom", (roomId: string) => {
      socket.leave(roomId);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected : =======>", socket.id);
    });
  });

  httpServer
    .once("error", (err: Error) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
