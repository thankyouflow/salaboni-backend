import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Query: {
    seePosts: protectedResolver( (_, {takeSet, offset}, {loggedInUser}) => {
        return client.post.findMany({
          take: takeSet,
          skip: offset,
          where: { groupId: loggedInUser.groupId },
          orderBy: {
            createdAt: "desc",
          },
        })
      }
    ),
  },
};