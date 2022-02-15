import { httpService } from "../utility/httpService";
import { httpConstants } from "../constants";

export function getTopSellers(requestData) {
    let url = process.env.REACT_APP_SELL_AND_PURCHASE_MICROSERVICE + "api/v1/top-sellers";
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