import { Logout } from "../../Utils";

export const injectParams = (_url_, params) => {
  let url = _url_;
  for (let i in params) {
    url = url.replace(":" + i, params[i]);
  }
  return url;
};

export const injectQueryParams = (_url_, queryParams) => {
  let url = _url_ + "?";
  Object.keys(queryParams).forEach((qp, index) => {
    url = `${url}${index === 0 ? "" : "&"}${qp}=${queryParams[qp]}`;
  });
  return url;
};

export const handleResponse = (response) => {
  if (response.results) {
    return response.results;
  }
  if (response.data) {
    return response.data;
  }
  return response;
};

export const handleError = (error) => {
  if (error.response?.status === 401) {
    Logout();
  }
  if (error.data) {
    return error.data;
  }
  if (error.response) {
    return error.response.data || error.response;
  }
  return error;
};
