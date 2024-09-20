// Destructure the Schema and Types properties from the Mongoose module
const { Schema, Types } = require("mongoose");

// Define the schema for reaction data
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter to format the date and time
      get: dateFormat,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Function to format the date and time when a reaction is posted.
// The date is passed to the function, formatted, and then returned.
function dateFormat(date) {
  const dateFormatted =
    [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/") + " ";
  const timeFormatted = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return dateFormatted + `at ` + timeFormatted;
}

// Export the reaction schema for use in the Thought model
module.exports = reactionSchema;
