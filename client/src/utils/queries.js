import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
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
