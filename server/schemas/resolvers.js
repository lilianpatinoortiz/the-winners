// Import models
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Declare resolvers, to be able to respond to a query
const resolvers = {
  // Defines the resolvers query - This has to match the typeDefs
  // We use mongoose queries. Its a function that determines how data is populated
  Query: {
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },
  },
};
// Export resolvers
module.exports = resolvers;
