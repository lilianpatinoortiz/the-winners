// Import models
const { GraphQLError } = require("graphql");
const { User, Project, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Declare resolvers, to be able to respond to a query
const resolvers = {
  // Defines the resolvers query - This has to match the typeDefs
  // We use mongoose queries. Its a function that determines how data is populated
  Query: {
    user: async (parent, { email }) => {
      return await User.findOne({ email });
    },
    project: async (parent, { id }) => {
      return await Project.findOne({ _id: id });
    },
    projects: async (parent) => {
      return await Project.find();
    },
    task: async (parent, { id }) => {
      return await Task.findOne({ _id: id });
    },
    tasks: async (parent) => {
      return await Task.find().populate("project");
    },
    myTasks: async (parent, { userid }) => {
      const params = {};
      if (userid) {
        params.userid = userid;
      }
      return await Task.find(params);
    },
    myProjects: async (parent, { userid }) => {
      return await Project.find({ userid: userid });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
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
    createProject: async (_, args) => {
      const project = await Project.create(args);
      return project;
    },
    addTask: async (_, args) => {
      const task = await Task.create(args);
      return task;
    },
    updateTask: async (_, args) => {
      const task = await Task.findByIdAndUpdate(args.taskid, args, {
        new: true,
      });
      return task;
    },
  },
};
// Export resolvers
module.exports = resolvers;
