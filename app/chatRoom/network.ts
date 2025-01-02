//pai call 
"use client"
import axios from 'axios'
import {Messages} from "../types/Messages" 

   export const fetchRooms = async (roomId:string) => {
      try {
        const response = await axios.get<{ data: Messages[] }>(`api/message?roomId=${roomId}`, {
          headers: {
            "Cache-Control": "no-store",
          },
        });
       return response.data?.data
      } catch (error) {
        return []
      }
    };

