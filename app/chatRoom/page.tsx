"use client";
// @ts-nocheck
import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useSocket from "./socket";
import { useRouter } from "next/navigation";
import useAuthRedirect from "../hooks/useAuthHook";
import Image from 'next/image'
import { Session } from "next-auth";
interface CustomSession extends Session {
  accessToken: string;
}

const ChatRoom = () => {
  const router = useRouter();

  const { session } = useAuthRedirect();
  const searchParams = useSearchParams();

  const roomName: string | null = searchParams.get("roomName") || null;
  const roomId: string | null = (searchParams.get("roomId") as string) || null;
  const accessToken: string = (session as CustomSession)?.accessToken ?? "";

  const { isConnected, connectionError, messages, sendMessage } = useSocket(
    roomId ?? "",
    accessToken
  );
  const [message, setMessage] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!roomName || !roomId) {
      router.push("/");
    }
  }, [roomName, roomId, router]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (!session) {
    router.push("/");
    return;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      //console.log("img : ",session?.user?.image)
      sendMessage(
        message,
        session?.user?.email ?? "",
        session?.user?.name ?? "",
        session?.user?.image?? ""
      );
      setMessage("");
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chat-room max-w-3xl mx-auto sm:p-6 pt-0 bg-white rounded-xl shadow-lg flex flex-col h-[92vh]">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Chat Room: {roomName || "N/A"}
      </h1>

      <div>
        {!isConnected || connectionError ? (
          <div className="text-red-500 mb-4 flex items-center space-x-2">
            <span role="img" aria-label="error">
              ❌
            </span>
            <span>Server: {connectionError ?? "Connecting..."}</span>
          </div>
        ) : (
          <div className="text-green-500 mb-4 flex items-center space-x-2">
            <span role="img" aria-label="success">
              ✅
            </span>
            <span>Connected to the server!</span>
          </div>
        )}
      </div>

      <div className="messages flex-grow overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg shadow-lg">
  {messages.map((msg, index) =>
    msg?.mt && msg.mt === "message" ? (
      <div
        key={index}
        className={`message p-4 rounded-lg shadow-md ${
          msg.email && msg.email === session?.user?.email
            ? "bg-blue-500 text-white ml-auto"
            : "bg-white text-gray-800"
        }`}
      >
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
            {msg.image ? (
              <Image
              src={msg.image}
              alt={msg.name ?? "User"}
              width={64} 
              height={64}
              className="object-cover"
            />
            ) : (
              <span className="block bg-gray-400 w-full h-full"></span>
            )}
          </div>
          <h4 className="font-bold text-lg">{msg.name ?? "Anonymous"}</h4>
        </div>
        <p className="text-sm">{msg.text}</p>
      </div>
    ) : (
      <div key={index} className="message bg-red-100 text-red-700 p-3 rounded-lg shadow-sm">
        <p className="font-medium">INFO: {msg.text}</p>
      </div>
    )
  )}
  <div ref={messagesEndRef} />
</div>


      <form
        onSubmit={handleSendMessage}
        className="flex items-center space-x-3 mt-auto"
      >
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
          className={`p-3 bg-blue-500 text-white rounded-lg ${
            !isConnected ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={!isConnected}
        >
          Send
        </button>
      </form>
    </div>
  );
};

const SuspenseChatRoom = () => {
  return (
    <Suspense>
      <ChatRoom />
    </Suspense>
  );
};
export default SuspenseChatRoom;
