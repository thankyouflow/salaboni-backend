import client from "../../client";
import {protectedResolver} from "../../users/users.utils";
import {geoDataApi, getDistanceFromLatLonInKm, roadNameApi, locaionApi} from "../../shared/shared.utils"
import fetch from "node-fetch";

export default {
  Query: {
    test: async () => {
      // console.log(await geoDataApi('남원로 527번길 66', '127.105406,37.3595669'))
      // console.log(getDistanceFromLatLonInKm(parseFloat('127.9425086'), parseFloat('37.3344701'), parseFloat('127.105406'), parseFloat('37.3595669')))
      const temp = await roadNameApi(1, 10, '강원도 남원로 527번길 66')
      const result = await locaionApi(temp.results.juso[0].admCd, temp.results.juso[0].rnMgtSn, temp.results.juso[0].udrtYn, temp.results.juso[0].buldMnnm, temp.results.juso[0].buldSlno)
      console.log(result.results.juso)
      return {ok: true}
    },
  },
};

