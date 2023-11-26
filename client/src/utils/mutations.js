import { gql } from "@apollo/client";
import { getGraphQLErrorsFromResult } from "@apollo/client/utilities";

export const ADD_USER =gql`
mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        email
        name
        password
      }
    }
  }
  
`
export const LOGIN = gql `
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        name
      }
    }
  }
`
