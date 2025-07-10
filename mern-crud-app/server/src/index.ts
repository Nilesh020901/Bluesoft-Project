import dotenv from "dotenv"
dotenv.config();

import { connectDB } from "./config/db";
import app from "./app";

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();