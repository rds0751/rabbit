import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { AuthToken } from "./UserAuthToken";
import axios from "axios";

export function getCategories(requestData) {
    let url = process.env.REACT_APP_WEBAPP_CLIENT_CONFIG_MICROSERVICE + "api/v1/categories";
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