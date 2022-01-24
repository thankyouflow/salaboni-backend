import { gql } from "apollo-server";

export default gql`
  type Query {
    seePosts(takeSet: Int!, offset: Int!): [Post]
  }
`;