import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editPost(caption: String, content: String, postId: Int, check: Int): MutationResponse!
  }
`;
