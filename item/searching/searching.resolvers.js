import client from "../../client";
import {
  roadNameApi,
} from "../../shared/shared.utils"

export default {
  Query: {
    searching: async (_, {word}) => {
      const roadNames = await roadNameApi(1, 10, word)
      console.log(roadNames.results)
      return {msg: roadNames.results.common.errorMessage, data: roadNames.results.juso}
    },
  },
};