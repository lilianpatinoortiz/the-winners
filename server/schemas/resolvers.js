// Import models
const { GraphQLError } = require("graphql");
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
    tasks: async (parent) => {
      return await Task.find();
    },
    reminder: async (parent, { id }) => {
      return await Reminder.findOne({ id });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        console.log("context:");
        console.log(context.user);
        return await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, args) => {
      const user = await User.findOne({
        $or: [{ name: args.name }, { email: args.email }],
      });
      if (!user) {
        throw GraphQLError("User not authenticated!");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw GraphQLError("User not authenticated!");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};
// Export resolvers
module.exports = resolvers;
