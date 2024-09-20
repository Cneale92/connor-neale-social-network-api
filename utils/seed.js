// Import the connection file to establish a connection to the Mongoose server
const connection = require("../config/connection");

// Import the User model to seed dummy data later
const { User } = require("../models");

// Error handling for the connection
connection.on("error", (err) => err);

// Establish a connection to MongoDB
connection.once("open", async () => {
  // Check for existing collections and drop them if they exist

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  // Create an array of user data to seed into the database
  const users = [
    {
      username: "connor",
      email: "connor@connor.com",
    },
    {
      username: "user2",
      email: "email@email.com",
    },
  ];

  // Insert the user data into the database
  await User.insertMany(users);

  // Display the seeded data and confirm when seeding is complete, then exit the process
  console.table(users);
  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});
