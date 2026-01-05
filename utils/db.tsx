


// import express from "express";
import dotenv from "dotenv"
// import cors from "cors";
import { Pool } from "pg";

dotenv.config();
// const app = express();

// app.use(express.json())

const envhost = process.env.ENVHOSTSITE ?? "http://localhost:3000"

export const pool = new Pool({
  connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGUSER}`, 
});


export const postgresConnect = async () => {
    try {
        await pool.connect()
        if (!pool) {
            throw new Error(
                "❌ POSTGRES_URI is not defined in environment variables."
            );
        }
        console.log("✅ PostgreSQL connected successfully");
    } catch (error) {
        throw new Error(`PostgreSQL connection failed`);
    }
}


// CORS middleware configuration
// const corsOptions = {
//     origin: envhost, // Replace with your frontend URL
//     methods: "GET,POST,PUT,DELETE,HEAD,PATCH", // Allowable methods
// };
// app.use(cors(corsOptions));

