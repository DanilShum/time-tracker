import { stringify } from "qs";
import axios, { AxiosInstance } from "axios";

const baseURL =
  location.hostname === "localhost"
    ? process.env.VUE_APP_BASE_API
    : `${location.origin}/api/`;

export const api: AxiosInstance = axios.create({
  paramsSerializer: {
    serialize: (params) => stringify(params),
  },
  baseURL,
});
