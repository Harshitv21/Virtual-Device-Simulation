import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
// for express
const PORT = 5000;

// creating a new http server for socket connections
const httpServer = createServer();
const serverSocket = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

// socket connection, PORT - 5005
serverSocket.on("connection", (socket) => {
    socket.on("Response", (res) => {
        console.log(res);
    });
});

app.get("/", (request, response) => {
    response.json({ "Working": "true" });
})

// for fan
app.post("/api/fan", (request, response) => {
    console.log("FAN");
    const { newSpeed } = request.body;
    serverSocket.emit("Fan", newSpeed);

    response.json({ "Server Working": "True", "Fan": "Working" });
})

// for led
app.post("/api/led", (request, response) => {
    console.log("LED");
    const { newColor } = request.body;
    serverSocket.emit("Led", newColor);

    response.json({ "Server Working": "True", "LED": "Working" });
})

// for bulb
app.post("/api/bulb", (request, response) => {
    console.log("BULB");
    serverSocket.emit("Bulb");

    response.json({ "Server Working": "True", "Bulb": "Working" });
})

/* Toggling ac on and off & Setting ac temperature */
// ac toggle 
app.post("/api/acToggle", (request, response) => {
    console.log("AC Toggle");
    serverSocket.emit("AcToggle");

    response.json({ "Server Working": "True", "AC Toggle": "Working" });
})

// ac temperature
app.post("/api/acTemp", (request, response) => {
    console.log("AC Temperature");
    const { currentTemperature } = request.body;
    serverSocket.emit("AcTemp", currentTemperature);

    response.json({ "Server Working": "True", "AC Temperature": "Working" });
})

// express
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

// listening for socket
httpServer.listen(5005, () => {
    console.log(`Socket server connection established!`);
})