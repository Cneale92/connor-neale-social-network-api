// Import the connect function and connection object from the mongoose module
const { connect, connection } = require("mongoose");

// Establish a connection to MongoDB using the local IP address and the default port, targeting the 'socialMediaAPI' database.
connect("mongodb://127.0.0.1:27017/socialMediaAPI");

// Export the connection object for use in other parts of the application.
module.exports = connection;
