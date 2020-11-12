import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // allows cross domain requests
app.use(express.json()); // allows POST requests with JSON
app.use(express.urlencoded({ extended: true })); // allows POST requests with GET-like parameters

export default app;