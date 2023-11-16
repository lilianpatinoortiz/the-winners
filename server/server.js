// This file integrates graphql to our exoress server - with the middleware

const express = require("express");
// Import apollo server class
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

// Import the two parts of a GraphQL Schema
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// Set the port number for the server, defaulting to 3001
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// Create a new instance of the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  // Start the Apollo server
  await server.start();

  // Middleware setup for handling URLencoded and JSON requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Set Apollo Server middleware for handling GraphQL requests, with authentication context
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));

  // Serve static files and handle routes in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Start the Express server when the db connection is open
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
