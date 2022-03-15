import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";
import { BASE_URL } from "../reducers/Constants";
import axios from "axios";
import { AuthToken } from "./UserAuthToken";

export function getNfts(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts?" + requestData;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      // console.log(response, "<<<< response");
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

// --------------------get nfts -----
export const getNFtsData = async (filterObj, successCallBack) => {
  try {
    const url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts";
    const { data } = await axios.get(url, { params: filterObj });
    successCallBack(data);
  } catch (e) {
    console.log(e);
  }
};


// --------

export const getNft = async (requestData, successCallBack) => {
  // alert("clled getNft")
  // console.log(req)
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v2/nfts/" + requestData;
  const { data } = await axios.get(url, { headers: AuthToken });
  if (data.success) {
    successCallBack(data.responseData);
  } else {
    console.log(data);
  }
  // return httpService(
  //   httpConstants.METHOD_TYPE.GET,
  //   { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON },
  //   {},
  //   url
  // )
  // .then(response => {
  //   console.log(response,"<<<< response at 40 webapp micro")
  //   if (
  //     !response.success ||
  //     response.responseCode != 200 ||
  //     !response.responseData ||
  //     response.responseData.length === 0
  //   )
  //     return Promise.reject();
  //   return Promise.resolve(response.responseData);
  // })
  // .catch(function (err) {
  //   return Promise.reject(err);
  // });
};

export function getCollections(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/collections";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getCollection(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/collection/" +
    requestData;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    {},
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getNftsByCollectionId(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/collection/" +
    requestData +
    "/nfts";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
export function getTopNftSales(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/get-top-nfts";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export async function getNameImageOfUser(_id) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/user/${_id}`);
    const result = await res.json();
    const user = result.responseData;
    return {
      name: user.firstName + " " + user.lastName,
      imageUrl: user.cdnUrl,
    };
  } catch (err) {
    console.log(err);
  }
}
export function getNotificationListById(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/notification/" +
    "6210ce09e9384c0035598c31";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      console.log(response, "sri")
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function addNftReport(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-nft-report";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
// export const getNotificationListById = async () => {
//   try {
//     const res = await fetch(
//       `${BASE_URL2}/api/v1/notification/6210ce09e9384c0035598c31`
//     );
//     const result = await res.json();
//     const collectionData = result.responseData;
//     return collectionData;
//   } catch (err) {
//     console.log(err);
//   }
// };

export function addLikeNft(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft/like";
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      console.log("likeresponse", response, "<<<<")
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export function getPricingHistory(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/pricing-history?" + requestData;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    requestData,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
