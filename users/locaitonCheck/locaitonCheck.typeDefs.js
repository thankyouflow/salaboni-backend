import { gql } from "apollo-server";

export default gql`
  type Mutation {
    locaitonCheck(entX: String, entY: String): MutationResponse!
  }
`;
