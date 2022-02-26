import { WHITE_LABEL_TOKEN } from "../reducers/Constants";

export const AuthToken = {
  "Access-Control-Allow-Origin": "*",
  "Content-type": "Application/json",
  "Authorization": `Bearer ${localStorage.getItem(WHITE_LABEL_TOKEN)}`,
};
