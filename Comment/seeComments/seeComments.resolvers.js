import client from "../../client";

export default {
  Query: {
    seeComments: (async (_, {takeSet, offset, adderssId}) => {
        return client.comment.findMany({
          take: takeSet,
          skip: offset,
          where: {adderssId},
          orderBy: {
            createdAt: "desc",
          },
        })
      }
    ),
  },
};