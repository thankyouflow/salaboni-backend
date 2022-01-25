import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Query: {
    seeItem: protectedResolver((_, {address1}, {loggedInUser}) => {
      if (loggedInUser.certification) {
        return client.item.findFirst({
          where: {address1},
        })
      }
      else{
        return client.item.findFirst({
          where: {address1},
        })
      }
    }),
  },
};