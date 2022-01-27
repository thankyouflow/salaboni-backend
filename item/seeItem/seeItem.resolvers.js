import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Query: {
    seeItem: protectedResolver((_, {roadAddr}, {loggedInUser}) => {
      if (loggedInUser.certification) {
        return client.item.findFirst({
          where: {roadAddr},
        })
      }
      else{
        return client.item.findFirst({
          where: {roadAddr},
        })
      }
    }),
  },
};