const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  
  type Query {
    user: User
  }
  
  type Auth {
    token: ID
    user: User
  }
  `;
module.exports = typeDefs;
