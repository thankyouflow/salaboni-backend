import { gql } from "apollo-server";

export default gql`
  type Query {
    seeItem(roadAddr: String!): Item
  }
`;