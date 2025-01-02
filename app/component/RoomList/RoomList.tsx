'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "../RoomCard/RoomCard"; // Adjust path if needed
import Link from "next/link";
import {RoomList as Room} from "../../types/Room"


const SkeletonLoader = () => (
  <div className="space-y-4 p-4 border border-gray-300 rounded-lg animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
  </div>
);

const RoomList: React.FC = () => {

  const [rooms, setRooms] = useState<Room[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchRooms = async () => {
      try {
        const response = await axios.get<{ data: Room[] }>("/api/rooms", {
          headers: {
            "Cache-Control": "no-store",
          },
        });
        setRooms(response.data?.data || []);
      } catch (error) {
        setError("Failed to load rooms. Please try again later."); 
      } finally {
        setLoading(false); 
      }
    };

    fetchRooms(); 
  }, []); 

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 pt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => <SkeletonLoader key={index} />)
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              key={room.id}
              name={room.name}
              roomId={room.id}
              description={room.description}
            />
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default RoomList;
