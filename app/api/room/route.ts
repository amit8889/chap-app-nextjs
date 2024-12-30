import { NextRequest, NextResponse } from 'next/server';
import { RoomList,Room } from "../../types/Room";
import { getAllRooms,addRoom} from "./queries";
import { errorHandler } from "../../utils/errorHandler";
import {addRoomSchema} from './validation/roomSchema'


const getRoomsHandler = async (req: NextRequest) => {
  const rooms: RoomList[] = await getAllRooms();

  return NextResponse.json(
    { 
      data: rooms, 
      success: true, 
      message: "Rooms fetched successfully" 
    },
    { status: 200 }
  );
};

const addRoomsHandler = async(req:NextRequest)=>{

  const roomData:Room= await req.json();
  const { error } = addRoomSchema.validate(roomData);
  if (error) {
    throw new Error(error.details[0].message);
  }
  await addRoom(roomData);
  return NextResponse.json(
    {
      success: true,
      message: 'Room added successfully'
    },
    { status: 200 }
  );
}

export async function GET(req: NextRequest) {
  return errorHandler(getRoomsHandler)(req);
}
export async function POST(req: NextRequest) {
  return errorHandler(addRoomsHandler)(req);
}