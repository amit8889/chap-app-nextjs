'use client';

import RoomList from './component/RoomList/RoomList';
import useAuthRedirect from './hooks/useAuthHook.ts'
const Home: React.FC = () => {
  const {session, status} = useAuthRedirect()
  if(!session){
    return
  }
  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-6">
      <h1 className="text-3xl font-semibold mb-6">Available Rooms</h1>
      <RoomList />
    </div>
  );
};

export default Home;
