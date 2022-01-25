import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, {location, addressId, payload}, {loggedInUser}) => {
        if (addressId) {
          const ok = await client.Item.findUnique({
            where: {
              id: addressId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            return {
              ok: false,
              error: "Item not found.",
            };
          }
        } else {
          const name = location.split(' ')[2]
          addressId = await client.Item.create({
            data: {
              location,
              group: {
                connectOrCreate: {
                  where: {
                    name,
                  },
                  create: {
                    name,
                  },
                },
              },
            }}).id;
        }
        const result = await client.comment.create({
          data: {
            payload,
            Item: {
              connect: {
                id: addressId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        return {
          ok: true,
          id: result.id
        };
      }
    ),
  },
};