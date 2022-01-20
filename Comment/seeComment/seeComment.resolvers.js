import client from "../../client";

export default {
  Query: {
    seeComment:  (_, {id}) => {
        return client.comment.findUnique({
          where: {id},
        })
      },
  },
};