// Import the router function from Express.js
const router = require("express").Router();

// Import the user CRUD functions from the controllers folder
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// Define the route to GET all users and POST a new user at /api/users
router.route("/").get(getUsers).post(createUser);

// Define the route to GET, PUT (update), and DELETE a single user by ID at /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Define the route to POST and DELETE a friend for a user at /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export the router to be used in other parts of the application
module.exports = router;
