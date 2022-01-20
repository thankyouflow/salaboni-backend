import { gql } from "apollo-server";

export default gql`
  type Comment {
    id: Int!
    payload:   String!
    user:      User!
    userId:    Int!
    adderss:     Address!
    adderssId:   Int!
    check:   Int!
    createdAt: String!
    updatedAt: String!
  }

  type Address {
  id:        Int!
  location:  String!
  comments:  [Comment]
  users:  [User]
  img:       String
  group:     Group!
  groupId:   Int!
  createdAt: String!
  updatedAt: String!
}
`;