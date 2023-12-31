const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const cors = require("cors")



const app = express();


/* Loading the environment variables from the .env file. */

const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI;
//|| "mongodb://localhost/todoapiDB"


const ActivityRouter = require("./routes/activity.route.js");



/* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());

/* Allowing the frontend to access the backend. */
app.use(cors());

/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get("/", (req, res) => {
  res.send("Hello World!");
});
/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true }).then(() => {
    app.listen(PORT, console.log("Server stated on port",PORT));
  })
  .catch((err) => {
    console.log(err);
  });

/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
app.use("/api", ActivityRouter);


