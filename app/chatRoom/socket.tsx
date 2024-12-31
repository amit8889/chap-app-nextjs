'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io()

interface MessageParams {
  me: boolean;
  text: string;
}

const useSocket = (roomId: string) => {
  const [messages, setMessages] = useState<MessageParams[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId || !socket) {
      return;
    }

    // Event listeners
    socket.on('joinRoom', () => {
      setIsConnected(true);
      setConnectionError(null);
      console.log('Socket connected!');
    });


    socket.on('connect_error', (error: { message: string }) => {
      setIsConnected(false);
      setConnectionError(`Connection error: ${error.message}`);
      console.error('Socket connection error:', error);
    });

    socket.on('disconnect', (reason: string) => {
      setIsConnected(false);
      setConnectionError(`Disconnected: ${reason}`);
      console.log(`Disconnected: ${reason}`);
    });

    socket.emit('joinRoom', roomId);

    socket.on('message', (message: string) => {
      console.log("Message received: ", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { me: false, text: message },
      ]);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('message');
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId]);

  
  const sendMessage = (message: string) => {
    if (!isConnected) {
      return; 
    }
    setMessages((prevMessages) => [...prevMessages, { me: true, text: message }]);
    socket.emit('message', {
      text: message,
      roomId,
    });
  };

  return { isConnected, connectionError, messages, sendMessage };
};

export default useSocket;
