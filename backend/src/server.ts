import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { initSocket } from "./sockets/socket";
import http from "http";

dotenv.config();


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
initSocket(server);

connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});