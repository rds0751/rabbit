import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";
import { BASE_URL } from "../reducers/Constants";
import axios from "axios";

export function getNfts(requestData) {
  // let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts";
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts";
  return httpService(
    httpConstants.METHOD_TYPE.GET,
    { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    requestData,
    url
  )
    .then((response) => {
      console.log(response, "<<<< response");
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

export const getNft = async (requestData, successCallBack) => {
  // alert("clled getNft")
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft/" + requestData;
  const { data } = await axios.get(url);
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

export function getCollection(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/collection/" + requestData ;
  return httpService(httpConstants.METHOD_TYPE.GET,
    { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON },
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
export function getTopNftSales(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/get-top-nfts";
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

export function addNftReport(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-nft-report" ;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
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

export function addLikeNft(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft/like" ;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
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