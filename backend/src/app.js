import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "50kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import Userrouter from "./routes/user.route.js";
app.use("/api/v1/user", Userrouter);

import programrouter from "./routes/program.route.js";
app.use("/api/v1/program", programrouter);

import taskrouter  from "./routes/task.route.js";
app.use("/api/v1/task", taskrouter);

import subtaskrouter from "./routes/subtask.route.js";
app.use("/api/v1/subtask", subtaskrouter);

import transactionrouter from "./routes/transaction.route.js";
app.use("/api/v1/transaction", transactionrouter);


export { app }