import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5001;
const io = new Server(5000);

io.on("connection", (socket) => {
    console.log("Client connected to socket");

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
    console.log(newSpeed);
    io.emit("Speed", newSpeed);

    response.json({ "Server Working": "True", "Fan": "Working" });
})

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});