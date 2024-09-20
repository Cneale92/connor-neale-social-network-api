// Import the Express.js framework for the server, the Mongoose connection, and the application routes
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Set the port to 3001 and create an instance of the Express application
const PORT = 3001;
const app = express();

// Configure the Express server to handle URL-encoded data, JSON, and the defined routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the Express server only after a successful database connection
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
