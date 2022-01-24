import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Query: {
    seeComment: protectedResolver((_, {id}, {loggedInUser}) => {
      if (loggedInUser.certification) {
        return client.comment.findUnique({
          where: {id},
        })
      }
    }),
  },
};