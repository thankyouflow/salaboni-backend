import client from "../../client";
import {protectedResolver} from "../../users/users.utils";
import {geoDataApi, roadNameApi} from "../../shared/shared.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, {roadAddr, addressId, payload}, {loggedInUser}) => {
        const typeList = ['아파트', '오피스텔', '주택']
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
          let type = ''
          const roadName = await roadNameApi(1, 10, roadAddr)
          const jibunAddr = roadName.results.juso[0].jibunAddr
          const buildingType = await buildingTypeApi(roadName.results.juso[0].admCd.substr(0, 5), roadName.results.juso[0].admCd.substr(5), roadName.results.juso[0].mtYn, roadName.results.juso[0].lnbrMnnm, roadName.results.juso[0].lnbrSlno)
          for (let num in buildingType) {
            for (let checkNum in typeList) {
              if (buildingType[num].etcPurps._text.indexOf(typeList[checkNum]) > -1) {
                type = typeList[checkNum];
                break
              }
            }
          }
          const geoData = await geoDataApi(roadAddr)
          const name = jibunAddr.split(' ')[2]
          addressId = await client.Item.create({
            data: {
              type,
              jibunAddr,
              roadAddr,
              entX: geoData.addresses[0].x,
              entY: geoData.addresses[0].y,
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
            }
          }).id;
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