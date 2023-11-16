// Import graphql
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

// Set the secret key for JWT and set the token expiration time
const secret = "mysecretssshhhhhhh";
const expiration = "2h";

// Export modules: authMiddleware and signToken function.
module.exports = {
  // * Error object for authentication error.
  // * GraphQLError: https://graphql.org/learn/serving-over-http/#graphql-error-object
  // * GraphQLError.extensions: https://graphql.org/learn/serving-over-http/#graphql-error-object-extensions
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),

  // * Function to check and authenticate the user , based on JWT token - it gets a request
  authMiddleware: function ({ req }) {
    // Get the token
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is in the 'Bearer' format, remove the 'Bearer' part
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // If no token, return the request object
    if (!token) {
      return req;
    }

    try {
      // Verify the token and get the authenticated person
      const { authenticatedPerson } = jwt.verify(token, secret, {
        maxAge: expiration,
      });
      // Add the authenticated person to the request object
      req.user = authenticatedPerson;
    } catch {
      console.log("Invalid token");
    }

    // Return the request object
    return req;
  },
  // * Function to sign the token - it gets an email and a username (_id is placeholder)
  signToken: function ({ email, username, _id }) {
    // Create the payload for the JWT token
    const payload = { email, username, _id };
    // Sign the token
    return jwt.sign({ authenticatedPerson: payload }, secret, {
      expiresIn: expiration,
    });
  },
};
