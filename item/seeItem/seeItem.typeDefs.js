import { gql } from "apollo-server";

export default gql`
  type Query {
    seeItem(address1: String!): Item
  }
`;