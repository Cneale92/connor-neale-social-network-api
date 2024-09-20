// Import the router function provided by Express.js
const router = require("express").Router();

// Import the userRoutes and thoughtRoutes, then allow our router to actually use the routes.
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
