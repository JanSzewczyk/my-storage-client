import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export const setBasicToken = (token) => {
  instance.defaults.headers.common["Authorization"] = `Basic ${token}`;
};

export const removeBasicToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export const setBearerToken = (token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeBearerToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export default instance;
