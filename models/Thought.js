// Destructure the Schema and model properties from the Mongoose module
const { Schema, model } = require("mongoose");

// Import the Reaction schema to save as an array of nested documents in the thought schema
const Reaction = require("./Reaction");

// Define the schema for thought data
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter to format the date and time
      get: dateFormat,
    },
    username: {
      type: String,
      required: true,
      ref: "user",
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Function to format the date and time when a reaction is posted.
// The date is passed into the function, formatted, and returned.
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

// Create a virtual property to count the number of reactions (length of the thought's reactions array)
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize the Thought model using the thoughtSchema
const Thought = model("thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;
