import AWS from "aws-sdk";
import fetch from "node-fetch";
import convert from "xml-js";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const deleteFromS3 = async (objectName) => {
  if (typeof objectName === 'string') {
    const bucketParams = {Bucket: "party-uploads", Key: objectName};
    return new AWS.S3().deleteObject(bucketParams).promise()
  } else if (typeof objectName === 'object') {
    // Objects:
    //   [
    //     {
    //    Key: "objectkey1"
    //   },
    //     {
    //    Key: "objectkey2"
    //   }
    //  ]
    const bucketParams = {
      Bucket: "party-uploads", Delete: {
        Objects: objectName,
        Quiet: false
      }
    };
    return new AWS.S3().deleteObjects(bucketParams).promise()
  }
};

export const uploadToS3 = async (file, userId, folderName) => {
  const {filename, createReadStream} = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const {Location} = await new AWS.S3()
    .upload({
      Bucket: "party-uploads",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};

export const geoDataApi = async (query, x, y) => {
  const coordinate = `${x},${y}`
  const url = x ? `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURI(query)}&coordinate=${encodeURI(coordinate)}` : `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURI(query)}`
  const result = await fetch(url, {
    method: "GET",
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
      'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
    },
  });
  return result.json()
};

export const polygonDataApi = async (x, y) => {
  const coordinate = `${x},${y}`
  const result = await fetch(`http://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&point=${encodeURI(coordinate)}&format=json&type=both&key=${process.env.OPEN_GEO_KEY}`, {
    method: "GET"
  });
  return result.json()
};

export const roadNameApi = async (currentPage, countPerPage, keyword) => {
  const result = await fetch(`https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${process.env.ROAD_NAME_KEY}&currentPage=${encodeURI(currentPage)}&countPerPage=${encodeURI(countPerPage)}&keyword=${encodeURI(keyword)}&resultType=json`, {
    method: "GET",
  });
  return result.json()
};

export const locaionApi = async (admCd, rnMgtSn, udrtYn, buldMnnm, buldSlno) => {
  const result = await fetch(`https://www.juso.go.kr/addrlink/addrCoordApi.do?confmKey=${process.env.LOCATION_KEY}&admCd=${encodeURI(admCd)}&rnMgtSn=${encodeURI(rnMgtSn)}&udrtYn=${encodeURI(udrtYn)}&buldMnnm=${encodeURI(buldMnnm)}&buldSlno=${encodeURI(buldSlno)}&resultType=json`, {
    method: "GET",
  });
  return result.json()
};

export const buildingTypeApi = async (admCd1, admCd2, mtYn, bun, gi) => {

  const requestUrl = `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?serviceKey=AyWMa4zyn1AE083fQU1%2FrWoxy56SSMaIRblbnLwM5a%2FDucs6X4M8tS%2FgJ7X7Jh9A5%2Fju8tbvwZFUYpPwAUO2MQ%3D%3D&sigunguCd=${encodeURI(admCd1)}&bjdongCd=${encodeURI(admCd2)}&platGbCd=${encodeURI(mtYn)}&bun=${encodeURI(bun.padStart(4,'0'))}&ji=${encodeURI(gi ? gi.padStart(4,'0') : '0000')}&numOfRows=50&pageNo=1`;

  const result = await fetch(requestUrl, {
    method: "GET",
  }).then(res => res.text())
    .then(data => {
      const result = convert.xml2js(data, {compact: true, spaces: 4});
      return result.response.body.items.item;
    })
    .catch(err => console.log(err));
  return result
};

export const getDistanceFromLatLonInKm = (lat1, lng1, lat2, lng2) => {
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1);  // deg2rad below
  let dLon = deg2rad(lng2 - lng1);
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  return d;
}

