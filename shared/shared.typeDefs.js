import { gql } from "apollo-server";

export default gql`
  type MutationResponse {
    ok: Boolean!
    msg: String
  }
`;