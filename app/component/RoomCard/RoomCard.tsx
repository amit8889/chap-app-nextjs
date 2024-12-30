// /components/Room/RoomCard.tsx
import React from 'react';

interface RoomCardProps {
  name: string;
  description: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 mb-6">
      <h3 className="text-xl font-semibold text-gray-700">{name}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default RoomCard; // Make sure this is exported as default
