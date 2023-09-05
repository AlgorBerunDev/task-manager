import axios from "axios";

export const baseURL = "/api";

const requestConfig = config => {
  if (localStorage.getItem("token")) config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  return config;
};

const handleRequestError = error => {
  return Promise.resolve(error);
};

const response = response => {
  return response;
};

const handleResponseError = error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("token");
    if (window.location.pathname !== "/login") window.location.href = "/login";
  }
  return Promise.resolve(error);
};

const customAxios = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  withCredentials: true,
});

customAxios.interceptors.request.use(requestConfig, handleRequestError);
customAxios.interceptors.response.use(response, handleResponseError);

export const uploadFile = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  responseType: "json",
  withCredentials: true,
});

uploadFile.interceptors.request.use(requestConfig, handleRequestError);
uploadFile.interceptors.response.use(response, handleResponseError);

export const http = customAxios;
