import { gql } from "apollo-server";

export default gql`
  type Item {
  id:        Int!
  address1:  String!
  address2:  String!
  type:      Int!
  entX:  String!
  entY:  String!
  comments:  [Comment]
  users:  [User]
  img:       String
  group:     Group!
  groupId:   Int!
  star:   Float
  createdAt: String!
  updatedAt: String!
}
  type juso {
    roadAddrPart1: String!
    admCd: String!
    rnMgtSn: String!
    udrtYn: String!
    buldMnnm: String!
    buldSlno: String!
}
`;