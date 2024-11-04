import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// for express
const PORT = process.env.PORT || 5069;

// creating a new http server for socket connections
const httpServer = createServer(app);
const serverSocket = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

// socket connection
serverSocket.on("connection", (socket) => {
    socket.on("Response", (res) => {
        console.log(res);
    });
});

// Express routes
app.get("/", (request, response) => {
    response.json({ "Working": "true" });
});

// Fan route
app.post("/api/fan", (request, response) => {
    console.log("FAN");
    const { newSpeed } = request.body;
    serverSocket.emit("Fan", newSpeed);
    response.json({ "Server Working": "True", "Fan": "Working" });
});

// LED route
app.post("/api/led", (request, response) => {
    console.log("LED");
    const { newColor } = request.body;
    serverSocket.emit("Led", newColor);
    response.json({ "Server Working": "True", "LED": "Working" });
});

// Bulb route
app.post("/api/bulb", (request, response) => {
    console.log("BULB");
    serverSocket.emit("Bulb");
    response.json({ "Server Working": "True", "Bulb": "Working" });
});

// AC toggle route
app.post("/api/acToggle", (request, response) => {
    console.log("AC Toggle");
    serverSocket.emit("AcToggle");
    response.json({ "Server Working": "True", "AC Toggle": "Working" });
});

// AC temperature route
app.post("/api/acTemp", (request, response) => {
    console.log("AC Temperature");
    const { currentTemperature } = request.body;
    serverSocket.emit("AcTemp", currentTemperature);
    response.json({ "Server Working": "True", "AC Temperature": "Working" });
});

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`Socket server connection established!`);
});
