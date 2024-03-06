// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import cors from "cors";
import {app} from './app.js'
dotenv.config({
    path: './.env.sample'
})



app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

connectDB() 
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

