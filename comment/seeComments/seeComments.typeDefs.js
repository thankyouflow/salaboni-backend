import { gql } from "apollo-server";

export default gql`
  type Query {
    seeComments(takeSet: Int!, offset: Int!, adderssId: Int!): [Comment]
  }
`;