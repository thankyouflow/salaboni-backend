import client from "../../client";
import {protectedResolver} from "../../users/users.utils";
import {
  geoDataApi,
  getDistanceFromLatLonInKm,
  roadNameApi,
  locaionApi,
  polygonDataApi,
  buildingTypeApi
} from "../../shared/shared.utils"
import fetch from "node-fetch";

export default {
  Query: {
    test: async () => {
      // console.log(getDistanceFromLatLonInKm(parseFloat('127.9425086'), parseFloat('37.3344701'), parseFloat('127.105406'), parseFloat('37.3595669')))

      // const jsonResult = await polygonDataApi('127.94','37.33')
      // const a = await geoDataApi('강원도 원주시 일산동 333-3 우보삼성아파트')
      // admCd 5 5
      // '강원도 원주시 예술관길 15'
      const temp = await roadNameApi(1, 10, '강원도 원주시 명륜동 855')

      const location = await locaionApi(temp.results.juso[0].admCd, temp.results.juso[0].rnMgtSn, temp.results.juso[0].udrtYn, temp.results.juso[0].buldMnnm, temp.results.juso[0].buldSlno)
      const buildingType = await buildingTypeApi(temp.results.juso[0].admCd.substr(0, 5), temp.results.juso[0].admCd.substr(5), temp.results.juso[0].mtYn, temp.results.juso[0].lnbrMnnm, temp.results.juso[0].lnbrSlno)
      // etcPurps
      let type = []
      console.log(buildingType.etcPurps._text)
      for (let num in buildingType) {
            // type.push(buildingType[num])
            console.log(buildingType[num].etcPurps._text)
      }
      console.log(temp)


      return {ok: true}
    },
  },
};
