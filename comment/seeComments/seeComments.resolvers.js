import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Query: {
    seeComments: protectedResolver((_, {takeSet, offset, adderssId}) => {
        if (loggedInUser.certification) {
          return client.comment.findMany({
            take: takeSet,
            skip: offset,
            where: {adderssId},
            orderBy: {
              createdAt: "desc",
            },
          })
        }
      }
    ),
  },
};