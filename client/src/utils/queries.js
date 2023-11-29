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
      userid
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
      userid
    }
  }
`;

export const QUERY_MY_TASKS = gql`
  query myTasks($userid: String!) {
    task(userid: $userid) {
      _id
      title
      priority
      status
      dueDate
      description
      createdDate
      userid
      project
    }
  }
`;

export const QUERY_MY_PROJECTS = gql`
  query myProjects($userid: String!) {
    project(userid: $userid) {
      _id
      title
      description
      dueDate
      createdDate
      userid
    }
  }
`;

export const QUERY_PROJECT = gql`
  query singleProject($id: ID!) {
    project(id: $id) {
      _id
      title
      description
      userid
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

export const QUERY_TASK = gql`
  query singleTask($id: ID!) {
    task(id: $id) {
      _id
      title
      description
      dueDate
      priority
      status
      project
    }
  }
`;
