const mongoose = require("mongoose");

// Connection to our database (mongodb)
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/the-winners"
);

module.exports = mongoose.connection;
