import axios from "axios";
import config from "../../../common/config";
import { handleResponse, handleError } from "./response";

/** axios configuration */
axios.defaults.withCredentials = true;

const BASE_URL = config.API_URL;

const get = (resource: string, id?: number) => {
  let url = `${BASE_URL}/${resource}`;
  if (id) url += `/${id}`;

  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
};

const post = (resource: string, model: object) => {
  return axios
    .post(`${BASE_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);
};

const put = (resource: string, model: object, id?: number) => {
  let url = `${BASE_URL}/${resource}`;
  if (id) url += `/${id}`;

  return axios
    .put(url, model)
    .then(handleResponse)
    .catch(handleError);
};

const remove = (resource: string, id: number) => {
  return axios
    .delete(`${BASE_URL}/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

export const apiProvider = {
  get,
  post,
  put,
  remove,
};
