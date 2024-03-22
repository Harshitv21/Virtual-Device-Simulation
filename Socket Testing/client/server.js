// import express from "express";
import { io } from "socket.io-client";
// import cors from "cors";

const socket = io("http://localhost:5000");
socket.on("Speed", (arg) => {
    console.log(arg);
});

socket.emit("Response", "Recieved Fan Speed...");
