// Import the connect function and connection object from the mongoose module
const { connect, connection } = require("mongoose");

// Establish a connection to MongoDB on the local machine using the default port and the 'socialMediaAPI' database.
connect("mongodb://127.0.0.1:27017/socialMediaAPI");

module.exports = connection;
