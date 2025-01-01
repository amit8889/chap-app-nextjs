import { executeQuery } from "../../lib/db";
// import { Messages } from "../../types/message"; 

export interface Messages {
    id?:string,
    text: string;
    name: string;
    cd?: Date; // Optional field
    mt?: string; // Optional field (could be 'msg', 'notification', etc.)
    email?: string; // Optional, for email of the sender
  }
export async function addMessage(params: Messages) {
    await executeQuery(
        `INSERT INTO "messages" ("roomId", "text", "email", "cd") 
        VALUES ($1, $2, $3, $4)`,
        [params.roomId, params.text, params.email, params.cd || new Date()]  
    );
}

export async function getAllMessages(roomId: string): Promise<Messages[]> {
    const result: Messages[] = await executeQuery(
        `SELECT * FROM messages WHERE "roomId" = $1 ORDER BY id DESC LIMIT 50`,
        [roomId]
    );
    return result;
}