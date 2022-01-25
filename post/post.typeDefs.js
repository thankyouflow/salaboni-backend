import { gql } from "apollo-server";

export default gql`
  type Post {
    id: Int!
    user:   User!
    userId:   Int!
    caption:   String!
    content:   String!
    postComments:  [PostComment]
    check:     Int!
    group:     Group!
    groupId:     Int!
    createdAt: String!
    updatedAt: String!
  }

  type PostComment {
  id:        Int!
  payload:   String!
  user:      User!
  userId:    Int!
  post:     Post!
  postId:   Int!
  check: Int!
  createdAt: String!
  updatedAt: String!
 }
  type Group {
  id:        Int!
  name:      String!
  addersses:   [Item]
  posts:     [Post]
  users:      [User]
  createdAt: String!
  updatedAt: String!
  }
`;