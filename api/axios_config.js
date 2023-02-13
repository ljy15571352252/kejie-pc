import axios from "axios";
import { jsonToFormData, isEmptyObject } from "@/assets/js/utils";
import { UserAuth } from "@/assets/js/auth/auth";
import config from "./config";
import jsonp from "jsonp";
const ReqContentType = {
  APPLICATION_JSON: "application/json;charset=UTF-8",
  APPLICATION_FORM: "application/x-www-form-urlencoded;charset=UTF-8",
};

const Method = {
  GET: "GET",
  POST: "POST",
  DELETE: "delete",
};

const http = axios.create(config);

/**
 * 请求前配置
 */
http.interceptors.request.use(
  (config) => {
    //请求操作
    if (process.client) {
    }
    if (!config.headers["Authorization"]) {
      /** 服务端渲染检测是否含有代理 **/
      let token = UserAuth.getToken();
      if (token) config.headers["Authorization"] = token;
    }
    if (config.method === "post") {
      if (config.data instanceof Object) {
        //如果传进来的是一个对象
        let params = "";
        for (let k in config.data) {
          params += `&${k}=${config.data[k]}`;
        }
        config.data = params;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * 响应配置
 */
http.interceptors.response.use(
  (response) => {
    if (process.client) {
    }
    if (response.data) return response.data.data;
    return response;
  },
  (error) => {
    if (process.client) {
    }
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          /** 无权限访问，去登录 **/

          break;
        case 500:
          if (typeof error.response.data.code !== "undefined") {
            return error.response.data;
          }
          break;
      }
    }
  }
);

export function ajax(
  url = "",
  data = {},
  method = Method.GET,
  contentType = ReqContentType.APPLICATION_FORM,
  headers = {}
) {
  return new Promise((resolve, reject) => {
    let axiosRes;
    switch (method) {
      case Method.GET:
        let subffix = isEmptyObject(data) ? "" : "?" + jsonToFormData(data);
        axiosRes = http({
          url: url + subffix,
          method: "get",
          headers: headers,
        });
        break;
      case Method.POST:
        headers["Content-Type"] = contentType;
        axiosRes = http({
          url: url,
          method: "post",
          headers: headers,
          data:
            contentType === ReqContentType.APPLICATION_FORM
              ? jsonToFormData(data)
              : JSON.stringify(data),
        });
        break;
      case Method.DELETE:
        axiosRes = http({
          url: url,
          method: "delete",
          headers: headers,
        });
        break;
    }
    axiosRes
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * jsonp请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function jsonpRequest(url = "", data = {}) {
  return new Promise(function (resolve, reject) {
    let subffix = isEmptyObject(data) ? "" : "?" + jsonToFormData(data);
    jsonp(url + subffix, null, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

export { ReqContentType, Method };
