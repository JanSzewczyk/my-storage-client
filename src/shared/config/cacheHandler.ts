import { AxiosAdapter, AxiosRequestConfig } from "axios";
import { setupCache } from "axios-cache-adapter";
import localforage from "localforage";
import _ from "lodash";

const CACHE_MAX_AGE: number = 2 * 60 * 1000; // 2 min
const whiteList: string[] = ["users/login"];

const cacheStore: LocalForage = localforage.createInstance({
  name: "jaris-console",
});

const exclude = (config: any = {}, req: AxiosRequestConfig) => {
  const { exclude = {}, debug } = config;

  // do not cache request with filter
  if (typeof exclude.filter === "function" && exclude.filter(req)) {
    debug(`Excluding request by filter ${req.url}`);
    return true;
  }

  // do not cache request with query
  const hasQueryParams = req.url?.match(/\?.*$/) || !_.isEmpty(req.params);
  if (exclude.query && hasQueryParams) {
    debug(`Excluding request by query ${req.url}`);
    return true;
  }

  // do not cache request with with url on white list
  const paths = exclude.paths || [];
  const found = _.find(paths, (regexp) => req.url?.match(regexp));
  if (found) {
    debug(`Excluding request by url match ${req.url}`);
    return true;
  }

  return false;
};

export const cacheAdapter = setupCache({
  clearOnStale: true,
  debug: false,

  exclude: {
    filter: (req: AxiosRequestConfig) => {
      return req.cache && req.cache.exclude;
    },
    // TODO ADD WHITE LIST
    // paths: whiteList,
    query: false,
  },
  key: (req: any): string => (req.cache && req.cache.key) || req.url,
  maxAge: CACHE_MAX_AGE,
  store: cacheStore,
});

const getKey: any = cacheAdapter.config.key;
const debug: any = cacheAdapter.config.debug;

export const myAdapter = (adapter: AxiosAdapter) => async (
  req: AxiosRequestConfig
) => {
  const isExcluded = exclude(cacheAdapter.config, req);
  const key = getKey(req);

  let res: any;
  try {
    res = await adapter(req);
  } catch (e) {
    debug("request-failed", req.url);

    if (e.request && req.cache && !isExcluded) {
      // Mimic the behaviour of axios-cache-adapter, but directly get from store.
      res = await cacheStore.getItem(key);
      if (res && res.data) {
        res = res.data;
        res.config = req;
        res.request = {
          networkError: true,
          fromCache: true,
        };
        return res;
      }
    }

    throw e;
  }

  return res;
};

const clearCacheByKey = async (key: string) => {
  debug("clear-cache-by-key", key);
  let result: any = await cacheStore.getItem(key);
  if (result && "expires" in result) {
    result.expires = 1;
    await cacheStore.setItem(key, result);
  }
};

const clearCacheByKeys = (keys: string[]) => {
  return Promise.all(keys.map(clearCacheByKey));
};

const purgeCache = async () => {
  debug("purge-cache");
  await cacheStore.clear();
};

const showCacheKeys = async () => {
  const x = await cacheStore.keys();
  debug("cache-keys", x);
  return x;
};

const setCacheByKey = async (key: string, data: any) => {
  debug("set-cache-by-key", key, data);
  let result: any = await cacheStore.getItem(key);
  if (result && "expires" in result) {
    result.expires = new Date().getTime() + CACHE_MAX_AGE;
    result.data = data;
    await cacheStore.setItem(key, result);
  }
};

export default {
  clearCacheByKey,
  clearCacheByKeys,
  purgeCache,
  showCacheKeys,
  setCacheByKey,
};
