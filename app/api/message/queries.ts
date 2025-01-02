import { executeQuery } from "../../lib/db";
 import { Messages } from "../../types/Messages"; 


  export async function addMessage(params: Messages) {
    if (!params.roomId || !params.text || !params.email || !params.name) {
        throw new Error("Missing required parameters: roomId, text, email, or name");
    }

    await executeQuery(
        `INSERT INTO "messages" ("roomid", "text", "email", "name", "image") 
        VALUES ($1, $2, $3, $4, $5)`,
        [params.roomId, params.text, params.email, params.name, params.image ?? ""]
    );
}

export async function getAllMessages(roomId: string): Promise<Messages[]> {
    const result: Messages[] = await executeQuery(
        `SELECT text,name,cd,email,roomid,image FROM messages WHERE roomid = $1 ORDER BY id DESC LIMIT 50`,
        [roomId]
    );
    return result;
}