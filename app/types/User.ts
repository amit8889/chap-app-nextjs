export interface User {
    id?: number;          // Unique identifier for the user
    name: string;        // Name of the user
    userName: string;    // Unique username for the user
    password: string;    // Hashed password (never store plain text)
}

export interface SocketUser {
    id: string;
    email: string;
    name: string;
    iat: number;
    exp: number;
    roomId: string; 
    image?:string
  }
  
  