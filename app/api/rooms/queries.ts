

import {executeQuery} from "../../lib/db"
import {RoomList,Room} from "../../types/Room"

export async function getAllRooms(): Promise<RoomList[]> {
    const result: RoomList[] = await executeQuery(`SELECT id, name, description FROM rooms ORDER BY id DESC`);
    return result;
}


export async function addRoom(params:Room) {
    await executeQuery(
        `INSERT INTO "rooms" ("name", "description") VALUES ($1, $2)`,
        [params.name.toUpperCase(), params.description]
      );
}