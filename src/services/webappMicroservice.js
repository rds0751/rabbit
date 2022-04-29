import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";
import { BASE_URL } from "../reducers/Constants";
import axios from "axios";
import { AuthToken } from "./UserAuthToken";
import { duration } from "moment";

export function getNfts(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts?" + requestData;
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
    const url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts?";
    const { data } = await axios.get(url, { params: filterObj });
    successCallBack(data);
  } catch (e) {

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
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/collections?" +
    requestData;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestData,
    url
  )
    .then((response) => {
      // console.log("response", response)
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData
        // response.responseData.length === 0
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

export function getNftsByCollectionId(id, requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/collection/" +
    id +
    "/nfts?" +
    requestData;
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
export function getTopNftSales(duration, requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/get-top-nfts?" +
    duration;
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
        !response.responseData
        // response.responseData.length === 0
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
    requestData;
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

export function getNotificationCountById(_id) {
  // console.log(notificationId,"sachin1111")
  let url =
  process.env.REACT_APP_WEBAPP_MICROSERVICE + `api/v1/notification/${_id}/read`;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    {id: _id},
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

export const addNftReport = async (requestData, successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/reports/nfts";
    const { data } = await axios.post(url, requestData);
    successCallBack(data);
  } catch (e) {
  }
};

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
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/pricing-history?" +
    requestData;
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
export function updateCollectionTxStatus(requestData, _id) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/collections/" +
    _id +
    "/status";

  return httpService(
    httpConstants.METHOD_TYPE.PUT,
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

export function getActivities(reqObj, id) {

  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    `api/v1/activities/${id}?type=${reqObj}`;
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    reqObj,
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

export function getList(reqType, id) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    `api/v1/activities/${id}?` +
    "type=" +
    "list";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    reqType,
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
