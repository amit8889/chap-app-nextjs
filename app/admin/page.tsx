'use client';

import React from 'react';
import RoomList from '../component/RoomList/RoomList';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  return (
    <div className="w-full min-h-[92vh] bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto p-6 min-h-[92vh] bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Available Rooms (Admin)
        </h1>
        <Link
          href="/admin/addRoom"
          className="inline-block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 mb-6"
        >
          Add Room
        </Link>
        <RoomList />
      </div>
    </div>
  );
};

export default AdminDashboard;
