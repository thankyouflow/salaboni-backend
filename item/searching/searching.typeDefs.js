import {gql} from "apollo-server";

export default gql`
  type SearchingResponse {
    msg: String!
    data: [juso]
  }

  type Query {
    searching(word: String!): SearchingResponse
  }
`;

//https://map.naver.com/v5/api/instantSearch?lang=ko&caller=pcweb&types=place,address,bus&coords=37.560042,126.98585&query=%EB%8D%94%EC%A1%B4%EB%B9%84%EC%A6%88%E3%85%87