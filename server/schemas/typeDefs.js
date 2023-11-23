const typeDefs = `

  # DATA DEFINITON

  type Reminder {
    _id: ID
    description: String
    dueDate: String
  }

  type Task {
    _id: ID
    description: String
    createdDate: String
    dueDate: String
    priority: Int
    status: String
    reminders: [Reminder]
  }

  type Project {
    _id: ID
    description: String
    createdDate: String
    dueDate: String 
    tasks: [Task]
  }

  # Define what can be queried for each user, this has to match to the models
  type User {
    _id: ID
    name: String
    email: String
    password: String
    projects: [Project]
    tasks: [Task]
  }
  
  # ENTRY POINTS
  # These are the entry points, controlls the data the query has access to.
  # Ex. user query has access to a User model data
  type Query {
    user(email: String!): User,
    project: Project,
    task: Task,
    reminder: Reminder
  }


  type Auth {
    token: ID
    user: User
  }
  `;
module.exports = typeDefs;
