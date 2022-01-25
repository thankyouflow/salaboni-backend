import client from "../../client";
import {protectedResolver} from "../../users/users.utils";
import {geoDataApi, getDistanceFromLatLonInKm, roadNameApi, locaionApi, polygonDataApi} from "../../shared/shared.utils"
import fetch from "node-fetch";
import axios from 'axios';
import cheerio from 'cheerio';

export default {
  Query: {
    test: async () => {
      // console.log(getDistanceFromLatLonInKm(parseFloat('127.9425086'), parseFloat('37.3344701'), parseFloat('127.105406'), parseFloat('37.3595669')))

      const jsonResult = await polygonDataApi('127.9425,37.33401')
      console.log(jsonResult.response.result[0].text)
      console.log(await geoDataApi(jsonResult.response.result[0].text))
      // const temp = await roadNameApi(1, 10, jsonResult.response.result[0].text)
      // const location = await locaionApi(temp.results.juso[0].admCd, temp.results.juso[0].rnMgtSn, temp.results.juso[0].udrtYn, temp.results.juso[0].buldMnnm, temp.results.juso[0].buldSlno)
      // console.log(location.results.juso)
      return {ok: true}
    },
  },
};
