import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import prisma from "./db/db.js";

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to database first
    await prisma.$connect();
    console.log("✓ Connected to Database");

    // Then start server
    const server = app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });

    // Graceful shutdown
    
  } catch (error) {
    console.error("✗ Database connection failed:", error);
    process.exit(1); // Stop server if DB fails
  }
}

startServer();
