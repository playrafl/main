import axios from "axios";
import isNil from "lodash/isNil";

const RestClient = axios.create({
  baseURL: process.env.NEXT_ORIGIN_URL,
  timeout: 90000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setRestAuth = (token: string) => {
  if (!isNil(token)) {
    RestClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }
};

export const deleteAuthorization = () => {
  delete RestClient.defaults.headers.common.Authorization;
  delete RestClient.defaults.headers.common["authorization"];
};

export default RestClient;
