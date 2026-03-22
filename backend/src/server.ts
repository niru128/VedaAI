import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { initSocket } from "./sockets/socket.js";
import http from "http";

dotenv.config();


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
initSocket(server);

connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});