import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5001;

const httpServer = createServer();
const serverSocket = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

serverSocket.on("connection", (socket) => {
    socket.on("Response", (arg) => {
        console.log(arg);
    });
});

app.get("/", (request, response) => {
    response.json({ "Working": "True" });
})

app.post("/api/fan", (request, response) => {
    console.log("Sending from express");
    const { newSpeed } = request.body;
    // console.log(newSpeed);
    serverSocket.emit("Speed", newSpeed);

    response.json({ "Server Working": "True", "Fan": "Working" });
})

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});

httpServer.listen(5003, () => {
    console.log(`Socket server connection established!`);
})