import axios from "axios";
import { cacheAdapter, myAdapter } from "./cacheHandler";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
  adapter: myAdapter(cacheAdapter.adapter),
});

export const setBasicToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = `Basic ${token}`;
};

export const removeBasicToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export const setBearerToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeBearerToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export default instance;
