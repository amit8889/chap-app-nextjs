'use client'

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();

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

    socket.on('connect', () => {
      setIsConnected(true);
      setConnectionError(null);
      console.log('Socket connected!');
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on('connect_error', (error: any) => {
      setIsConnected(false);
      setConnectionError(`Connection error: ${error.message}`);
      //console.error('Socket connection error:', error);
    });

    socket.on('disconnect', (reason: string) => {
      setIsConnected(false);
      setConnectionError(`Disconnected: ${reason}`);
      //console.log(`Disconnected: ${reason}`);
    });

    socket.emit('joinRoom', roomId);

    // Listen for incoming messages
    socket.on('message', (message: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { me: false, text: message },
      ]);
    });

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('message');
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId]);

  // Send a message to the room
  const sendMessage = (message: string) => {
    if (!isConnected) {
      return; 
    }
    setMessages((prevMessages) => [...prevMessages, { me: true, text: message }]);
    socket.emit('message', message);
  };
  return { isConnected, connectionError, messages, sendMessage };
};

export default useSocket;
