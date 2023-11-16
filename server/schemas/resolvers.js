// Import models
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Declare resolvers
const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },
  },
};
// Export resolvers
module.exports = resolvers;
