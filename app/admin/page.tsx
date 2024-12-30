
'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../component/RoomCard/RoomCard'; // Adjust path if needed
import Link from 'next/link';

// Room interface
interface Room {
  id: number;
  name: string;
  description: string;
}

// Skeleton Loader for Card (Placeholder)
const SkeletonLoader = () => (
  <div className="space-y-4 p-4 border border-gray-300 rounded-lg animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
  </div>
);

const AdminDashboard = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rooms', {
          headers: {
            'Cache-Control': 'no-store',
          },
        });
        setRooms(response.data?.data || []);
      } catch (error) {
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Available Rooms</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Available Rooms</h1>
      <Link className="bg-blue-500 text-white p-2 rounded mb-4" href="/admin/addRoom">
        Add Room
      </Link>

      {/* Loading Placeholder */}
      <div className="grid grid-cols-1 pt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton loaders while data is loading
          Array(3)
            .fill(0)
            .map((_, index) => (
              <SkeletonLoader key={index} />
            ))
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard key={room.id} name={room.name} description={room.description} />
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
