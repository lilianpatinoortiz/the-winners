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
export const ADD_TASK = gql`
  mutation addTask($title: String!, $description: String!, $createdDate: String!, $dueDate: String!, $priority: Int, $status: String!, $project: String!){
    addTask(title: $title, description: $description, createdDate: $createdDate, dueDate: $dueDate, priority: $priority, status: $status, project: $project) {
      _id
      title
      description
      createdDate
      dueDate
      priority
      status
      project
      }
    }
`;
