'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import {Messages} from "../types/Messages"
import {fetchRooms}  from "./network"
let socket: Socket | null = null;

const useSocket = (roomId: string,token: string | undefined) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId || !token) {
      return;
    }
    fetchRooms(roomId).then((data=>{
      setMessages([...data,...messages])
      console.log(data)
    })).catch((error)=>{
      
    })
    // connsct socket
    socket = io('http://localhost:3000', {
      reconnection: false, 
      query: {
        token: token,
        roomId: roomId
     }});
    if(!socket){
      setConnectionError('Failed to connect to the server');
      return;
    }
    // Event listeners
    socket.on('room_joined', () => {
      console.log('connection')
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

   

    socket.on('message', (message: Messages) => {
      // console.log("Message received pre: ", messages);
    //   console.log("Message received: cur  ", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        message,
      ]);
    });

    socket.emit("room_join","")

    return () => {
      if(socket==null){
        return;
      }
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('message');
      socket.off("room_joined")
      socket.disconnect()
    };
  }, [roomId,token]);

  
  const sendMessage = (message: string,email:string,name:string,image:string) => {
    if (!isConnected || !socket) {
      return; 
    }
    // console.log("messages send pre: ",messages)
    // console.log("messages send no: ",{ text: message ,email:email,name:name,cd:new Date(),mt :"message"})
    setMessages((prevMessages) => [...prevMessages, { text: message ,email:email,name:name,cd:new Date(),mt :"message",image:image}]);
    socket.emit('message', {
      text: message,
      roomId
    });
  };

  return { isConnected, connectionError, messages, sendMessage };
};

export default useSocket;
