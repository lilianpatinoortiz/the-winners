const typeDefs = `
  type Auth {
    token: ID
    user: User
  }

  type Task {
    _id: ID
    title: String
    description: String
    createdDate: String
    dueDate: String
    priority: Int
    status: String
    userid: String # User
    project: String
  }

  type Project {
    _id: ID
    title: String
    description: String
    createdDate: String
    dueDate: String 
    userid: String # User
    tasks: [Task]
  }

  type User {
    _id: ID
    name: String
    email: String
    password: String
    projects: [Project]
    tasks: [Task]
  }
  

  type Query {
    user(email: String!): User,
    project(id: ID!): Project,
    projects:[Project],
    task: Task,
    tasks:[Task],
    myProjects (userid: String!): [Project],
    myTasks (userid: String!): [Task],
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
  }

  type Mutation{
    createUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
  
  `;
module.exports = typeDefs;
