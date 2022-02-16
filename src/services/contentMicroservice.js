import { contextType } from "react-swipe";
import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { httpServiceFileUpload } from "../utility/httpServiceFileUpload";

export default {
    addIpfs,
};
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
  