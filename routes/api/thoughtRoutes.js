// Import the router function from Express.js
const router = require("express").Router();

// Import the CRUD functions for thoughts from the controllers folder
const {
  createThought,
  getThoughts,
  getSingleThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// Define the route to GET all thoughts and POST a new thought at /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// Define the route to GET, PUT (update), and DELETE a single thought by ID at /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Define the route to POST a reaction to a single thought at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// Define the route to DELETE a reaction from a single thought at /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// Export the router for use in other parts of the application
module.exports = router;
