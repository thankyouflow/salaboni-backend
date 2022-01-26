import { gql } from "apollo-server";

export default gql`
type createCommentResult {
    ok: Boolean!
    error: String
    id: Int
  }

  type Mutation {
    createComment(roadAddr: String, addressId: Int, payload: String!): createCommentResult!
  }
`;