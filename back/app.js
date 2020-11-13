import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors()); // allows cross domain requests
app.use(express.json()); // allows POST requests with JSON
app.use(express.urlencoded({ extended: true })); // allows POST requests with GET-like parameters
app.use(express.static("public"));
export default app;
