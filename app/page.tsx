'use client';
import RoomList from "./component/RoomList/RoomList"
export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Available Rooms</h1>
      <RoomList/>
    </div>
  );
}
