// Import the User and Thought models
const { User, Thought } = require("../models");

// Export functions for use in the routes folder
module.exports = {
  // Retrieve all users and send as JSON response
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Retrieve a single user by ID and send as JSON response
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user and send the created user as JSON response
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update an existing user by ID and send the updated user as JSON response
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { username: req.body.username, email: req.body.email } },
        { new: true, upsert: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Delete a user by ID, along with their associated thoughts, and send a confirmation message
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Delete associated thoughts
      res.json({ message: "User and associated thoughts deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user using the $addToSet operator and send the updated user as JSON response
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.userId } }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this ID!" });
      }

      // Retrieve the updated user to display the latest data
      const updatedUser = await User.findById(req.params.userId);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user using the $pull operator and send the updated user as JSON response
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.userId } }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this ID!" });
      }

      // Fetch the updated user's information after removing a friend
      const updatedUser = await User.findById(req.params.userId);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
