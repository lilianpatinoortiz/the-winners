// Import models
const { User, Project, Task, Reminder } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Declare resolvers, to be able to respond to a query
const resolvers = {
  // Defines the resolvers query - This has to match the typeDefs
  // We use mongoose queries. Its a function that determines how data is populated
  Query: {
    user: async (parent, { email }) => {
      return await User.findOne({ email });
    },
    project: async (parent, { id, title }) => {
      return await Project.findOne({ title });
    },
    task: async (parent, { id, title }) => {
      return await Task.findOne({ title });
    },
    reminder: async (parent, { id }) => {
      return await Reminder.findOne({ id });
    },
  },
};
// Export resolvers
module.exports = resolvers;
