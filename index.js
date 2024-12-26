import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import albumRoutes from "./routes/album.route.js";
import songRoutes from "./routes/song.route.js";
import statRoutes from "./routes/stat.route.js";

dotenv.config();

const __dirname= path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentpath:true,
    limits:{
        fileSize: 10 * 1024 * 1024,//10 MB ,ax file size
    }
}))

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/stats", statRoutes);

//ERROR HANDLER
app.use((err,req,res,next) => {
    res.status(500).json({message: process.env.NODE_ENV === "production" ?"Internal Server Error":err.message});
})


// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});

//TODO: implement socket.io