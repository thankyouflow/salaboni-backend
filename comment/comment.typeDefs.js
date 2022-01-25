import { gql } from "apollo-server";

export default gql`
  type Comment {
    id: Int!
    payload:   String!
    user:      User!
    userId:    Int!
    adderss:     Item!
    adderssId:   Int!
    check:   Int!
    createdAt: String!
    updatedAt: String!
  }
`;