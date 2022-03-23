import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";
import { AuthToken } from "./UserAuthToken";

export function getTopSellers(requestData) {
    let url = process.env.REACT_APP_SELL_AND_PURCHASE_MICROSERVICE + "api/v1/top-sellers";
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
export function getTopBuyers(duration,requestData) {
  console.log("jjjjjjjjjjjsssssjjjj",duration)
  let url = process.env.REACT_APP_SELL_AND_PURCHASE_MICROSERVICE + "api/v1/top-buyers?duration="+duration+"&limit=40&skip=0";
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

export function getTopCollections(requestData) {
    let url = process.env.REACT_APP_SELL_AND_PURCHASE_MICROSERVICE + "api/v1/top-collections";
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

export function pricingHistoryGraphOfNft(requestData) {
    let url =
      process.env.REACT_APP_SELL_AND_PURCHASE_MICROSERVICE + "sold-price-graphs-of-particular-nft" ;
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
export function addNftTx(requestData) {
  let url =
    process.env.REACT_APP_SELL_AND_PURCHASE_MICROSERVICE + "api/v1/add-transaction" ;
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
export function updateTxStatus(requestData,requestId) {
  // console.log("requestId--",requestId)
  // console.log("requestData--",requestData)

  let url =
    process.env.REACT_APP_SELL_AND_PURCHASE_MICROSERVICE + "api/v1/transactions/"+requestId+"/status";
  // console.log("url------------",url)
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