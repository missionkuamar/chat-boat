import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";
import path from "path"
dotenv.config();

const app = express();

// using middleware with restricted CORS methods
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

//importing routes
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

//using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
// Define the path to your client build folder
const _dirname = path.resolve();

// Serve static files from the 'client/dist' folder
app.use(express.static(path.join(_dirname, 'client', 'dist')));

// Catch-all route to serve index.html for frontend React app (This should be last)
app.use((req, res, next) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`server is working on port ${process.env.PORT}`);
  connectDb();
});
