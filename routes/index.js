// Import the router function provided by Express.js
const router = require("express").Router();

// Import the ./api folder's routes as middleware and allow the router to use them
const apiRoutes = require("./api");
router.use("/api", apiRoutes);

// Display a message if the user stumbles across the wrong route
router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;
