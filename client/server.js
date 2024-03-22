import express from "express";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (request, response) => {
    response.json({ "Working": "true" });
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});