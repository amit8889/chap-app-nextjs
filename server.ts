// import { createServer, IncomingMessage, ServerResponse } from 'http';
// import next from 'next';
// import socketIo from 'socket.io';

// // Set up environment variables
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // Prepare Next.js app
// app.prepare().then(() => {
//   // Create HTTP server
//   const server = createServer((req: IncomingMessage, res: ServerResponse) => {
//     handle(req, res);
//   });

//   // Create Socket.IO instance attached to the server
//   const io = socketIo(server);

//   // Listen for connection events from clients
//   io.on('connection', (socket: socketIo.Socket) => {
//     console.log('A user connected');

//     // Listen for messages from clients and broadcast to all clients
//     socket.on('send_message', (message: string) => {
//       console.log('Message received:', message);
//       io.emit('receive_message', message); // Emit to all connected clients
//     });

//     // Handle user disconnect
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

//   // Start server listening on port 3001
//   server.listen(3001, (err?: Error) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3001');
//   });
// });
