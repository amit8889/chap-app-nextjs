
export interface Room {
  name: string;
  description: string;
}

export interface RoomList extends Room {
  id: number;
}
