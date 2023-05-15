// import dependencies 
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

// import database connection 
import connectToDB from "./db.js";

// import routes 
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import User from "./models/User.js";

// TODO: import error handler util 

// create express app 
const app = express();

// use middlewares
app.use(cors({
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json())


// connect to DB
connectToDB();

// use routes 
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

// Start the app and listen on port 3000
const port = 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
