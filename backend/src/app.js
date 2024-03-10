import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000']; // Replace with your allowed origins

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Include this if you need to send cookies
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "100kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import Userrouter from "./routes/user.route.js";
app.use("/api/v1/user", Userrouter);

import userProgramsrouter from "./routes/userPrograms.route.js";
app.use("api/v1/userPrograms", userProgramsrouter);

import programrouter from "./routes/program.route.js";
app.use("/api/v1/program", programrouter);

import taskrouter  from "./routes/task.route.js";
app.use("/api/v1/task", taskrouter);

import subtaskrouter from "./routes/subtask.route.js";
app.use("/api/v1/subtask", subtaskrouter);

import transactionrouter from "./routes/transaction.route.js";
app.use("/api/v1/transaction", transactionrouter);

import useractionrouter from "./models/useraction.model.js";
app.use("/api/v1/useraction", useractionrouter);


export { app }