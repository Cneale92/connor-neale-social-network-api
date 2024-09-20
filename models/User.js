// Destructure the Schema and model properties from the Mongoose module
const { Schema, model } = require("mongoose");

// Import the validator package to validate email inputs
const validator = require("validator");

// Define the schema for user data
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Use the validator package's isEmail method to ensure the email format is valid
      validate: [validator.isEmail, "Invalid email format."],
    },
    // Reference the thoughts model to link a user's thoughts as an array of _id values
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    // Self-reference the user model to link a user's friends as an array of _id values
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property to count the number of friends for a user (length of friends array)
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize the User model using the userSchema
const User = model("user", userSchema);

// Export the User model
module.exports = User;
