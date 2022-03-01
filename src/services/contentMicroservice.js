// import { contextType } from "react-swipe";
import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { httpServiceFileUpload } from "../utility/httpServiceFileUpload";
import axios from "axios";
import { AuthToken } from "./UserAuthToken";
import { WHITE_LABEL_TOKEN } from "../reducers/Constants";

const dev_url = "https://goi4mbj86f.execute-api.us-east-1.amazonaws.com/dev/"; // need to store it in .env file

export default {
  addIpfs,
  createNftContent,
  // updateNftContent,
  openForSale,
  removeFromSale,
  ownershipTransfer,
};
// export default getCollection;
function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
    skip: true,
    "Access-Control-Allow-Origin": "*",
    "x-access-token": `${localStorage.getItem(WHITE_LABEL_TOKEN)}`,
    // 'Authorization': `Bearer ${utility.getAccessToken()}`
  };
}

async function addIpfs(requestdata) {
  // let url = "http://localhost:3001" + "/add-file-ipfs";
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-file-ipfs";

  return httpServiceFileUpload(
    httpConstants.METHOD_TYPE.POST,
    {},
    requestdata,
    url
  )
    .then((response) => {
      if (
        !response.success ||
        response.responseCode !== 200 ||
        !response.responseData ||
        response.responseData.length === 0
      )
        return Promise.reject(response);
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

// async function createNftContent(requestdata) {
//   let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft";

//   // let url = "http://localhost:3001" + "/add-file-ipfs";
//   // let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-file-ipfs";

//   return httpServiceFileUpload(
//     httpConstants.METHOD_TYPE.POST,
//     {},
//     requestdata,
//     url
//   )
//     .then((response) => {
//       if (
//         !response.success ||
//         response.responseCode !== 200 ||
//         !response.responseData ||
//         response.responseData.length === 0
//       )
//         return Promise.reject(response);
//       return Promise.resolve(response.responseData);
//     })
//     .catch(function (err) {
//       return Promise.reject(err);
//     });
// }
async function createNftContent(requestdata) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft";

  return httpService(
    httpConstants.METHOD_TYPE.POST,
    // { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON },
    AuthToken,
    requestdata,
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
// async function updateNftContent(requestData, requestId) {
//   let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nfts/" + requestId;
//   let headers = getHeaders();
//   return httpService(httpConstants.METHOD_TYPE.PUT, headers, requestData, url)
//     .then((response) => {
async function openForSale(requestData) {
  let url = process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/open-for-sale";
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.PUT, headers, requestData, url)
    .then((response) => {
      console.log("------ssss", response.responseData);

      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

// ---- nft created by user----

// export async function NftCreatedByUser(requestData) {
//   let url =
//     process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft-createdby-user";
//   let headers = getHeaders();
//   return httpService(httpConstants.METHOD_TYPE.GET, headers, requestData, url)
//     .then((response) => {
//       console.log("------ssss", response.responseData);

//       if (!response.success || !response.responseData) return Promise.reject();
//       return Promise.resolve(response.responseData);
//     })
//     .catch(function (err) {
//       return Promise.reject(err);
//     });
// }

export const NftCreatedByUser = async (successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft-createdby-user";
    const { data } = await axios.get(url);
    if (data.success) {
      successCallBack(data);
    } else {
      successCallBack({ success: false, msg: "Unable To Fetch Data" });
    }
    console.log(data, "<<<<myprofile");
  } catch (e) {
    console.log(e);
  }
};
// ------nft owned by user
export const NftOwnedByUser = async (successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/nft-ownedby-user";
    const { data } = await axios.get(url);
    if (data.success) {
      successCallBack(data);
    } else {
      successCallBack({ success: false, msg: "Unable To Fetch Data" });
    }
    console.log(data, "<<<<myprofile");
  } catch (e) {
    console.log(e);
  }
};

// =------------------ Get nfts by collection  id----
export const getALLCollectionById = async (id, successCallBack) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE +
      `api/v1/collection/${id}/nfts`;
    const { data } = await axios.get(url);

    successCallBack(data);
  } catch (e) {
    console.log(e);
  }
};
// ----

async function removeFromSale(requestData) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/remove-nft-from-sale";
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.PUT, headers, requestData, url)
    .then((response) => {
      console.log("------ssss", response.responseData);

      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function ownershipTransfer(requestData, contentId) {
  let url =
    process.env.REACT_APP_WEBAPP_MICROSERVICE +
    "api/v1/nft/transfer/" +
    contentId;
  let headers = getHeaders();
  return httpService(httpConstants.METHOD_TYPE.PUT, headers, requestData, url)
    .then((response) => {
      console.log("------ssss", response.responseData);

      if (!response.success || !response.responseData) return Promise.reject();
      return Promise.resolve(response.responseData);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

export const addSuggestion = async (bodyData, successCallback) => {
  try {
    const url =
      process.env.REACT_APP_WEBAPP_MICROSERVICE + "api/v1/add-suggestion";
    const { data } = await axios.post(url, bodyData, { headers: AuthToken });
    if (data.success) {
      successCallback(data.responseData);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAboutData = async (id, successCallBack) => {
  const url = `${dev_url}api/v1/about/61f7b7a4c017de6244c51144`;
  const { data } = await axios.get(url);
  console.log(data, "<<<dataabout");
  if (data.success) {
    successCallBack(data.responseData);
  } else {
    console.log(data, "<<error");
  }
};
