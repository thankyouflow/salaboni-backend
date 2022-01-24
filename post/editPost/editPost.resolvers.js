import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Mutation: {
    editPost: protectedResolver(
      async (_, {caption, content, postId, check}, {loggedInUser}) => {
        if (!postId) {
          await client.post.create({
            data: {
              caption,
              content,
              groupId: loggedInUser.groupId,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
        } else {
          const post = await client.post.findUnique({
            where: {
              id: postId,
            },
            select: {
              userId: true,
              postComments: true,
            },
          });
          if (!post) {
            return {
              ok: false,
              msg: "Post not found.",
            };
          } else if (post.userId !== loggedInUser.id) {
            return {
              ok: false,
              msg: "Not authorized.",
            };
          } else if (post.postComments.length() > 0) {
            return {
              ok: false,
              msg: "Impossible edit.",
            };
          } else {
            await client.post.update({
              where: {
                id: postId
              },
              data: {
                check,
                caption,
                content,
              }
            });
          }
        }

        return {
          ok: true
        };
      }
    ),
  },
};