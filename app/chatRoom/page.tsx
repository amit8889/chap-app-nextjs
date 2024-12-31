'use client'

import { useEffect, useState ,useMemo,Suspense} from 'react';
import { useSearchParams } from 'next/navigation'
import useSocket from './socket';
import { useRouter } from "next/navigation";

const ChatRoom = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const roomName: string | null = searchParams.get('roomName') || null;
  const roomId:string | null = searchParams.get('roomId') as string || null;
  const { isConnected, connectionError, messages, sendMessage } = useSocket(roomId ?? '');
  const [message, setMessage] = useState<string>('');

 useEffect(() => {
    if (!roomName || !roomId) {
      router.push("/"); 
    }
  }, [roomName, roomId,router]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);  
      setMessage(''); 
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div className="chat-room max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Chat Room: {roomName || "N/A"}</h1>

      <div>
        {(!isConnected || connectionError) ? (
          <div className="text-red-500 mb-4 flex items-center space-x-2">
            <span role="img" aria-label="error">❌</span>
            <span>Server: {connectionError ?? "Connecting..."}</span>
          </div>
        ) : (
          <div className="text-green-500 mb-4 flex items-center space-x-2">
            <span role="img" aria-label="success">✅</span>
            <span>Connected to the server!</span>
          </div>
        )}
      </div>

      <div className="messages space-y-4  overflow-y-auto h-60">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-3 rounded-lg ${msg.me ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100 text-gray-700'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type a message"
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isConnected}
        />
        <button
          type="submit"
          className={`p-3 bg-blue-500 text-white rounded-lg ${!isConnected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={!isConnected}
        >
          Send
        </button>
      </form>
    </div>
  );
};

const SuspenseChatRoom = ()=>{
  return (
    <Suspense>
      <ChatRoom />
    </Suspense>
  )
}
export default SuspenseChatRoom;
