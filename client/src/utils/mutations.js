import { gql } from "@apollo/client";
import { getGraphQLErrorsFromResult } from "@apollo/client/utilities";
//test comment
export const ADD_USER = gql`
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
`;
export const LOGIN = gql`
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
`;
export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $title: String!
    $description: String!
    $userid: String!
    $createdDate: String!
    $dueDate: String!
  ) {
    createProject(
      title: $title
      description: $description
      userid: $userid
      createdDate: $createdDate
      dueDate: $dueDate
    ) {
      _id
      title
      description
      userid
    }
  }
`;
