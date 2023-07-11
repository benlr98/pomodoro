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
//cors
app.use(cors({
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200
}));
//body-parser
app.use(bodyParser.json());


// connect to DB
connectToDB();

// use routes 
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

// const errorResponder = (err, req, res, next) => {
//   // err.statusMessage = `Test error message.` // detailed error message
//   err.statusCode = 300 // error code for responding to client
//   res.header("Content-Type", 'application/json')
//   res.status(err.statusCode).send(JSON.stringify(err, null, 4)) // pretty print
// }
// app.use(errorResponder);

// Start the app and listen on port 3000
const port = 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// const invalidPathHandler = (req, res, next) => {
//   res.redirect('/error')
// }