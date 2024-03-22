import express from "express";
import cors from "cors";
// import axios from "axios";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    response.json({ "Working": "true" });
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});