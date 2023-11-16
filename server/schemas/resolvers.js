// Import models
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Declare resolvers
const resolvers = {
  // Defaines the resolvers query - This has to match the typeDefs
  Query: {
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },
  },
};
// Export resolvers
module.exports = resolvers;
