import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { BASE_URL } from "../reducers/Constants";
import axios from "axios";
import { addUseraction, addUserData } from "../reducers/Action";



export const CheckUserByWalletAddress = async (
  walletAddress,
  successCallBack
) => {
  let url = BASE_URL + "/api/v1/wallet-address";
  console.log(url, walletAddress, "<<<< wallet address");
  const { data } = await axios.put(url, { wallet_address: walletAddress });
  console.log(data, "<<<<data");
  if (data.success) {
    // return data.responseData;
    successCallBack(data.responseData);
    // dispatch(addUserData(data.responseData));
  } else {
    console.log(data);
    // return data;
  }
  // successCallback(data)
  // return httpService(
  //   httpConstants.METHOD_TYPE.PUT,
  //   { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
  //   { wallet_address: walletAddress },
  //   url
  // )
  //   .then((response) => {
  //     console.log(response, "<<<<getting userDAta");
  //     if (
  //       !response.success ||
  //       response.responseCode !== 200 ||
  //       !response.responseData ||
  //       response.responseData.length === 0
  //     )
  //       return Promise.reject();
  //     return Promise.resolve(response.responseData);
  //   })
  //   .catch(function (err) {
  //     return Promise.reject(err);
  //   });
};

export function getUser(requestData) {
  let url =
    process.env.REACT_APP_USER_MICROSERVICE + "api/v1/user/" + requestData;
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
