import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
  Mutation: {
    postComment: protectedResolver(
      async (_, {postId, payload, postCommentId, check}, {loggedInUser}) => {
        const ok = await client.post.findUnique({
          where: {
            id: postId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            msg: "Post not found.",
          };
        }

        if (!postCommentId) {
          await client.postComment.create({
            data: {
              payload,
              post: {
                connect: {
                  id: postId,
                },
              },
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
        } else {
          const postComment = await client.postComment.findUnique({
            where: {
              id: postCommentId,
            },
            select: {
              userId: true,
            },
          });
          if (!postComment) {
            return {
              ok: false,
              msg: "PostComment not found.",
            };
          } else if (postComment.userId !== loggedInUser.id) {
            return {
              ok: false,
              msg: "Not authorized.",
            };
          } else {
              await client.postComment.update({
                where: {
                  id: postCommentId
                },
                data: {
                  check,
                  payload,
                },
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