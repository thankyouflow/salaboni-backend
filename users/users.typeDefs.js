import { gql } from "apollo-server";

export default gql`
   type User {
    id: Int!
    nickname: String!
    firstName: String!
    lastName:  String
    username:  String!
    email:     String!
    phoneNumber:     Int!
    password:  String!
    comments:  [Comment]
    location:  String!
    post:     [Post]
    postComment:     [PostComment]
    stay:      Int
    adderss:     Address!
    adderssId:   Int!
    certification:  Boolean!
    rooms:     [Room]
    Message:   [Message]
    group:     Group!
    groupId:   Int!
    createdAt: String!
    updatedAt: String!
  }
`;