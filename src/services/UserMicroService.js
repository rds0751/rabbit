import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { BASE_URL, WHITE_LABEL_TOKEN } from "../reducers/Constants";
import axios from "axios";
import { addUseraction, addUserData } from "../reducers/Action";
const dev_url = "https://goi4mbj86f.execute-api.us-east-1.amazonaws.com/dev/"; // need to store it in .env file
const AuthToken = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    Authorization: `Bearer ${localStorage.getItem(WHITE_LABEL_TOKEN)}`,
  },
};

export const CheckUserByWalletAddress = async (
  walletAddress,
  successCallBack
) => {
  console.log("<<< token by auth token");
  let url = BASE_URL + "/api/v1/wallet-address";
  console.log(url, walletAddress, "<<<< wallet address");
  const { data } = await axios.put(
    url,
    { wallet_address: walletAddress }
    // { headers: AuthToken }
  );
  console.log(data, "<<<<datawalletaddress");
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

export const getCategories = async (successCallBack) => {
  const url = dev_url + "api/v1/categories";
  console.log(url, "<<<url");
  const { data } = await axios.get(url, { headers: AuthToken });
  if (data.success && data.responseCode == 200) {
    successCallBack(data);
  } else {
    console.log(data);
  }
};

export const updateUser = async (userData, successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_USER_MICROSERVICE + `api/v1/user/${userData._id}`;
    const { data } = await axios.put(url, { userData }, { headers: AuthToken });
    console.log(data, "<<<<");
  } catch (e) {
    console.log(e);
  }
};
