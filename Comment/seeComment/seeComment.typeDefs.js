import { gql } from "apollo-server";

export default gql`
  type Query {
    seeComment(id: Int!): Comment
  }
`;