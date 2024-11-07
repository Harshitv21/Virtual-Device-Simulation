import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

// Resolve the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// for express
const PORT = process.env.PORT || 5069;

// creating a new http server for socket connections
const httpServer = createServer(app);
const serverSocket = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

// Device state tracking
let deviceStates = {
    fanSpeed: 0,
    ledColor: "#a3ffaf", // default color
    bulbIsOn: true,
    acTemperature: 16,
    acOn: false,
};

// socket connection
serverSocket.on("connection", (socket) => {
    socket.on("Fan", (newSpeed) => {
        deviceStates.fanSpeed = newSpeed;
        socket.broadcast.emit("Fan", newSpeed);
    });

    socket.on("Led", (newColor) => {
        deviceStates.ledColor = newColor;
        socket.broadcast.emit("Led", newColor);
    });

    socket.on("Bulb", (isOn) => {
        deviceStates.bulbIsOn = isOn;
        socket.broadcast.emit("Bulb", isOn);
    });

    socket.on("AcTemp", (newTemp) => {
        deviceStates.acTemperature = newTemp;
        socket.broadcast.emit("AcTemp", newTemp);
    });

    socket.on("AcToggle", () => {
        deviceStates.acOn = !deviceStates.acOn;
        socket.broadcast.emit("AcToggle", deviceStates.acOn);
    });

    socket.on("Response", (res) => {
        console.log(res);
    });
});

// Express routes
app.get("/", (request, response) => {
    response.json({ "Working": "true" });
});

app.get("/devices", (request, response) => {
    response.json(deviceStates);
});

// Fan route
app.post("/fan/:speed?", (request, response) => {
    const { speed } = request.params;
    const querySpeed = request.query.speed;
    const bodySpeed = request.body.newSpeed;

    // Determine the fan speed from the path parameter, query parameter, or body (in that order)
    let fanSpeed = speed || querySpeed || bodySpeed;

    // If no fan speed is provided or if it's invalid, default to 0
    if (!fanSpeed || isNaN(fanSpeed) || fanSpeed < 1 || fanSpeed > 5) {
        fanSpeed = 0;
    }

    fanSpeed = Number(fanSpeed);

    deviceStates.fanSpeed = fanSpeed;
    serverSocket.emit("Fan", fanSpeed);
    response.json({ "Server Working": "True", "Fan": "Working", "Speed": fanSpeed });
});

// Fan route
app.get("/fan", (request, response) => {
    response.json({ "Server Working": "True", "Fan": "Working", "Device current status": deviceStates.fanSpeed });
});

const colorMap = {
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    yellow: '#FFFF00',
    orange: '#FFA500',
    purple: '#800080',
    pink: '#FFC0CB',
    white: '#FFFFFF',
    black: '#000000',
    grey: '#808080',
    brown: '#A52A2A',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    lime: '#00FF00',
    violet: '#8A2BE2',
    tomato: '#FF6347',
    mediumSeaGreen: '#3CB371',
    gold: '#FFD700',
    blueViolet: '#8A2BE2',
    chocolate: '#D2691E',
    deepPink: '#FF1493',
    deepSkyBlue: '#00BFFF',
    crimson: '#DC143C',
    saddleBrown: '#8B4513',
    greenYellow: '#ADFF2F'
};

// Default color when nothing is passed
const defaultColor = '#a3ffaf';

// LED route
app.post("/led/:color?", (request, response) => {
    const { color } = request.params;
    const queryColor = request.query.color;
    const bodyColor = request.body.newColor;

    // Determine the color from the path parameter, query parameter, or body (in that order)
    let colorValue = color || queryColor || bodyColor || defaultColor;

    // Check if the color is one of the predefined color keywords (e.g., red, green)
    if (colorMap[colorValue]) {
        colorValue = colorMap[colorValue];
    }

    // Remove the '#' if it exists to make the validation consistent
    const colorWithoutHash = colorValue.startsWith('#') ? colorValue.slice(1) : colorValue;

    // Validate if the color is a valid hex code (matches the pattern of 6 characters, no '#')
    const hexColorRegex = /^[0-9A-Fa-f]{6}$/;

    // Check if the color is valid
    if (!hexColorRegex.test(colorWithoutHash)) {
        return response.status(400).json({
            error: "Invalid color. Please provide a valid hex color value or a predefined color keyword (e.g., red, green, blue)."
        });
    }

    // Add '#' to the color if it doesn't have it already
    if (!colorValue.startsWith('#')) {
        colorValue = `#${colorValue}`;
    }

    deviceStates.ledColor = colorValue;
    // Emit the color value to the LED
    serverSocket.emit("Led", colorValue);
    response.json({ "Server Working": "True", "LED": "Working", "Color": colorValue });
});

// LED route
app.get("/led", (request, response) => {
    response.json({ "Server Working": "True", "LED": "Working", "Device current status": deviceStates.ledColor });
});

// Bulb route
app.post("/bulb", (request, response) => {
    const { isOn } = request.body;  // Get the state from the client request

    deviceStates.bulbIsOn = isOn;
    serverSocket.emit("Bulb", isOn);  // Emit with the state
    response.json({ "Server Working": "True", "Bulb": isOn ? "On" : "Off" });
});

// Bulb route
app.get("/bulb", (request, response) => {
    response.json({ "Server Working": "True", "Bulb": "Working", "Device current status": deviceStates.bulbIsOn });
});

// AC toggle route
app.post("/acToggle", (request, response) => {
    const { turnOnAC } = request.body;

    deviceStates.acOn = turnOnAC;
    serverSocket.emit("AcToggle", turnOnAC);
    response.json({ "Server Working": "True", "AC Toggle": "Working" });
});

// AC toggle route
app.get("/acToggle", (request, response) => {
    response.json({ "Server Working": "True", "AC Toggle": "Working", "Device current status": deviceStates.acOn });
});

// AC temperature route
app.post("/acTemp", (request, response) => {
    const { currentTemperature } = request.body;
    deviceStates.acTemperature = currentTemperature;
    serverSocket.emit("AcTemp", currentTemperature);
    response.json({ "Server Working": "True", "AC Temperature": "Working" });
});

// AC temperature route
app.get("/acTemp", (request, response) => {
    response.json({ "Server Working": "True", "AC Temperature": "Working", "Device current status": deviceStates.acTemperature });
});

// Catch-all for undefined routes to serve the 404 page
app.use((request, response) => {
    response.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`Socket server connection established!`);
});
