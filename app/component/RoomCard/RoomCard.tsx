// /components/Room/RoomCard.tsx
import React from 'react';
import Link from "next/link"
interface RoomCardProps {
  name: string;
  description: string;
  roomId:number
}

const RoomCard: React.FC<RoomCardProps> = ({ name, description,roomId }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6 max-w-xs w-full mx-auto hover:scale-105 hover:bg-blue-50">
    <div className="flex flex-col space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800 truncate">{name}</h3>
      <p className="text-gray-600 text-base line-clamp-3">{description}</p>
      <div className="mt-4">
        <Link
          href={`/chatRoom?roomName=${name}&roomId=${roomId}`}
          className="inline-block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg text-center w-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Join Room
        </Link>
      </div>
    </div>
  </div>  
  );
};

export default RoomCard;
