import { createServer, IncomingMessage, ServerResponse } from "node:http";
import next from "next";
import { Server, Socket } from "socket.io";
import { createRequire } from 'module';
import jwt from 'jsonwebtoken';
import { addMessage } from "./app/api/message/queries";
import {SocketUser} from "./app/types/User"
import {Messages} from "./app/types/Messages"

declare module 'socket.io' {
  interface Socket {
    user: SocketUser;
  }
}

const require = createRequire(import.meta.url);
const dev: boolean = process.env.NODE_ENV !== "production";
const hostname: string = "localhost";
const port: number = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
    handler(req, res);
  });

  const io = new Server(httpServer);

  io.use((socket: Socket, next) => {
    const { token, roomId } = socket.handshake.query;
    console.log("Token:", token, "Room ID:", roomId);

    if (!token || !roomId) {
      socket.emit("disconnect", "Token or roomId is missing");
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET || "your-secret-key");
      socket.user = decoded as SocketUser;
      socket.user.roomId = roomId as string;

      return next();
    } catch (error) {
      console.log(error);
      const msg:Messages={
        text: `user has left the room.`,
        cd: new Date(),
        mt: "notification",
        roomId:roomId as string
      }
      socket.to(roomId).emit("message", msg);


      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);
    // Retrieve user details and roomId
    const { email, name, roomId,image="" } = socket.user;
    console.log("User:", email, name, "Room ID:", roomId);

    // Join the user to the room
   
    socket.on("room_join",()=>{
      socket.join(roomId);
      socket.emit("room_joined","")
      const msg:Messages={
        text: `${name} has joined the room.`,
        cd: new Date(),
        mt: "notification",
        roomId:roomId as string,
      }
      socket.to(roomId).emit("message", msg);

    })
    

    socket.on("message", (message: { roomId: string; text: string }) => {
      const { roomId, text } = message;
      const msg:Messages={
        text: text,
        cd: new Date(),
        mt: "message",
        roomId:roomId as string,
        email:email,
        image:image,
        name:name
      }
      // addMessage({roomId:roomId as string, text:text,email:email})
      if (roomId) {
        socket.to(roomId).emit("message", msg);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      const msg:Messages={
        text: `${name} has left the room.`,
        cd: new Date(),
        mt: "notification",
        roomId:roomId as string,
      }
      socket.to(roomId).emit("message", msg);
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
