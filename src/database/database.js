import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();
export const connection = new Pool({
    connectionString: process.env.DATABASE_URL
});