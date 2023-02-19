import axios from "axios";
import {CommonLoader} from "../../../components/common/Loader/Loader";
import { config } from "../../config/Config";
import { appStorageService } from "../storage/Storage";
import { apiEndpoints } from "./apiEndpoints";
import {
  handleError,
  handleResponse,
  injectParams,
  injectQueryParams,
} from "./apiHelpers";

const axiosInstances = {
  i1: axios.create({
    baseURL: config.baseUrl,
  }),
};

export const apiCall = (apiEndpointName, options) => {
  const { body, params, queryParams, loader = false } = { ...options };

  if (apiEndpoints[apiEndpointName] === undefined) {
    const err = new Error(
      "API " +
        apiEndpointName +
        " not found in endpointConfig. Please check api. Endpoints"
    );
    return err;
  }

  const config = JSON.parse(JSON.stringify(apiEndpoints[apiEndpointName]));

  //Inject params here.
  if (params) {
    config.url = injectParams(config.url, params);
  }
  //Inject params here.
  if (queryParams) {
    config.url = injectQueryParams(config.url, queryParams);
  }
  const axiosInstance = axiosInstances[config.instance] || axiosInstances.i1;
  showHideLoader(loader, true);
  return axiosInstance({ method: config.method, url: config.url, data: body })
    .then((res) => {
      showHideLoader(loader, false);
      return handleResponse(res);
    })
    .catch((err) => {
      showHideLoader(loader, false);
      return handleError(err);
    });
};

const showHideLoader = (loader, show) => {
  if (loader) {
    show ? CommonLoader.show() : CommonLoader.hide();
  }
};

const allInstances = Object.keys(axiosInstances);
const appName = config.appName;
allInstances.forEach((i) => {
  // Add a request interceptor
  axiosInstances[i].interceptors.request.use(
    function (config) {
      const userDetails = appStorageService.local.get(appName);
      if (userDetails.token_type && userDetails.access_token) {
        config.headers.Authorization = `${userDetails.token_type} ${userDetails.access_token}`;
      }
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstances[i].interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
});
