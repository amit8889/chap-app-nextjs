import { NextRequest, NextResponse } from 'next/server';

import { errorHandler } from "../../utils/errorHandler";
import {Messages} from "../../types/Messages"
import {getAllMessages} from "./queries"

const getMessageHandler= async(req:NextRequest)=>{
    const url = new URL(req.url); 
    const roomId = url.searchParams.get('roomId') || '';
     if (!roomId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Room ID is required',
        },
        { status: 400 }
      );
    }
  const message:Messages[] = await getAllMessages(roomId)
  return NextResponse.json(
    {
      success: true,
      message: 'all message',
      data : message
    },
    { status: 200 }
  );
}

export async function GET(req: NextRequest) {
  return errorHandler(getMessageHandler)(req);
}