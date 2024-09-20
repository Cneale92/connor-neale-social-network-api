// Import the Thought and User models
const { Thought, User } = require("../models");

// Export functions for use in the routes folder
module.exports = {
  // Retrieve all thoughts and send them as JSON response
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Retrieve a single thought by ID and send it as JSON response
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought and send the created thought as JSON response
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update an existing thought by ID and send the updated thought as JSON response
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: { thoughtText: req.body.thoughtText } },
        { new: true, upsert: true }
      );
      res.status(200).json(updatedThought);
    } catch (err) {
      console.log("Something went wrong");
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Delete a thought by ID and send a confirmation message
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID!" });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought and send the updated thought as JSON response
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID!" });
      }

      // Retrieve the updated thought to display the latest data
      const updatedThought = await Thought.findById(req.params.thoughtId);
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought and send the updated thought as JSON response
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID!" });
      }

      const updatedThought = await Thought.findById(req.params.thoughtId);
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
