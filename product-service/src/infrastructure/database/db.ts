import { Pool } from "pg";

export const pool = new Pool({
    user: "user",
    host: "localhost",
    database: "productdb",
    password: "password",
    port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
