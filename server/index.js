// import dependencies 
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// import database connection 
import connectToDB from "./db.js";

// import routes 
import usersRoutes from './routes/userRoutes.js'
import User from "./models/User.js";

// TODO: import error handler util 

// create express app 
const app = express();

// use middlewares
app.use(bodyParser.json())


// connect to DB
connectToDB();

// use routes 
app.use('/users', usersRoutes)

async function findAllUsers() {

  // Find a user by their ID
  const users = await User.find();
  
  // Log the user's details to the console
  return users
  
}

// Define your app routes here
app.get("/", async (req, res) => {
  const users = await findAllUsers();
  res.send(users)
});

// Start the app and listen on port 3000
const port = 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
