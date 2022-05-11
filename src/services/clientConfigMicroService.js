import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { AuthToken } from "./UserAuthToken";
import axios from "axios";
import { BASE_URL1 } from "../reducers/Constants";
import { WHITE_LABEL_TOKEN } from "../reducers/Constants";

export function getCategories(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_CLIENT_CONFIG_MICROSERVICE +
    "api/v1/categories";
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

export async function getTenantData() {
  const token = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": `${localStorage.getItem(WHITE_LABEL_TOKEN)}`,
  };
  try {
    let address = localStorage.getItem("walletAddress") ? localStorage.getItem("walletAddress") : "0x9affb1cf8e276657f857e0b6c982e093bdb50968";
    const url = `${BASE_URL1}/api/v1/tenant/wallet/${address}`;
    const res = await fetch(url, { headers: token });
    const result = await res.json();
    const tenantData = result.responseData;
    return tenantData;
  } catch (err) {
    console.log(err);
  }
}

export const getBlogs = async () => {
    try {
        const url = `${BASE_URL1}/api/v1/blogs`;
        const res = await fetch(url, { headers: AuthToken });
        const result = await res.json();
        return result;
      } catch (err) {
        console.log(err);
      }
};

export const getBlogsId = async (id) => {
  try {
      const url = `${BASE_URL1}/api/v1/blog/${id}`;
      const res = await fetch(url, { headers: AuthToken });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
};



