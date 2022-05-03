import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { AuthToken } from "./UserAuthToken";
import axios from "axios";
import { BASE_URL1 } from "../reducers/Constants";

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
  try {
    const url = `${BASE_URL1}/api/v1/tenant/624fcce73cfee400358f2cef`;
    const res = await fetch(url, { headers: AuthToken });
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
        return result.responseData;
      } catch (err) {
        console.log(err);
      }
};
