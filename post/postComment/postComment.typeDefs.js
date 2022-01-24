import { gql } from "apollo-server";

export default gql`
  type Mutation {
    postComment(postId: Int!, payload: String, postCommentId: Int, check: Int): MutationResponse!
  }
`;