import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Query: {
    seePost:  protectedResolver( (_, {id}, {loggedInUser}) => {
        return client.post.findFirst({
          where: {
            id,
            groupId: loggedInUser.groupId
          },
        })
      }),
  },
};