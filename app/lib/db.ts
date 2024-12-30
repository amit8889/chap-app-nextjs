import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

class Database {
  private static instance: Database | null = null; // Singleton instance
  private pool: Pool | null = null; 
  private tablesCreated = false; // Ensures tables are created only once

  private constructor() {}


  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async initializePool(): Promise<void> {
    if (!this.pool) {
      console.log("Connecting to DB:", process.env.DB_URL);
      this.pool = new Pool({
        connectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false },
      });

      this.pool.on('connect', (client) => {
        console.log('New client connected to the database');
        client.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED');
      });

      this.pool.on('remove', () => {
        console.log('Client removed from the pool');
      });

      this.pool.on('error', (err) => {
        console.error('Database connection error:', err);
      });

      console.log("=== Connection pool initialized ===");

      // Create tables after initializing the pool
      if (!this.tablesCreated) {
        await this.createTables();
      }
    }
  }

  
  private async createTables(): Promise<void> {
    if (this.tablesCreated) return; 

    await this.initializePool();
    if (!this.pool) return;

    try {
      const sqlFilePath = path.join(process.cwd(), '/app/sql/roomSchema.sql');
      const sql = fs.readFileSync(sqlFilePath, 'utf-8');
      await this.pool.query(sql);
      console.log('Tables created successfully.');
      this.tablesCreated = true;
    } catch (error) {
      console.error('Error in table creation:', error);
    }
  }

  // Public method to execute a query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async executeQuery<T>(queryText: string, params?: any[]): Promise<T[]> {
    await this.initializePool();
    if (!this.pool) {
      throw new Error("Database pool not initialized");
    }

    try {
      const result = await this.pool.query<T>(queryText, params);
      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  // Public method to close the pool (useful during application shutdown)
  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.log("Database pool closed");
    }
  }
}

// Export a single function to execute queries
const database = Database.getInstance();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeQuery = async <T>(queryText: string, params?: any[]): Promise<T[]> => {
  return await database.executeQuery(queryText, params);
};
