/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */

 export const eventConstants = {
    SHOW_LOADER: "SHOW_LOADER",
    HIDE_LOADER: "HIDE_LOADER",
  
    SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  };
  
export const httpConstants = {
    METHOD_TYPE: {
        POST: 'POST',
        PUT: 'PUT',
        GET: 'GET',
        DELETE: 'DELETE',
    },
    CONTENT_TYPE: {
        APPLICATION_JSON: 'application/json',
        MULTIPART_FORM_DATA: 'multipart/form-data',
        APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
        IMAGE_PNG: 'image/png'
    },
    DEVICE_TYPE: {
        WEB: 'web'
    },
    API_END_POINT: {}
};