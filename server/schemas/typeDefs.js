const typeDefs = `
# Define what can be queried for each user, this has to match to the models
type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  
  # Define the queries, this has to match to the typeDefs
  type Query {
    user: User
  }

  # Define the mutations, this has to match to the typeDefs
  
  # Define the auth
  type Auth {
    token: ID
    user: User
  }
  `;
module.exports = typeDefs;
