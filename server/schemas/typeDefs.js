const typeDefs = `

  # DATA DEFINITON
  # Define what can be queried for each user, this has to match to the models
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  
  # ENTRY POINTS
  # These are the entry points, controlls the data the query has access to.
  # Ex. user query has access to a User model data
  type Query {
    user: User
  }


  type Auth {
    token: ID
    user: User
  }
  `;
module.exports = typeDefs;
