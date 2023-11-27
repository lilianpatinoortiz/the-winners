import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($name: String!) {
    user(name: $name) {
      _id
      name
      email
    }
  }
`;

export const QUERY_TASKS = gql`
  {
    tasks {
      _id
      title
      priority
      status
      dueDate
      description
      createdDate
      project
    }
  }
`;

export const QUERY_PROJECTS = gql`
  {
    projects {
      _id
      title
      description
      dueDate
      createdDate
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      name
      email
    }
  }
`;
