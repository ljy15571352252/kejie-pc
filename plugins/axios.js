import { UserAuth } from "@/assets/js/auth/auth";
export default function ({store, redirect, req, router, app: { $axios,$config }})  {

    // 数据访问前缀
    $axios.defaults.baseURL = $config.VUE_APP_BASE_API;
    // request拦截器
    $axios.onRequest(config => {
        console.log(config.url,config.baseURL)
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
    });
    // response拦截器，数据返回后，可以先在这里进行一个简单的判断
    $axios.interceptors.response.use(
        response => {
            if (process.client) {
            }
            if (response.data) return response.data.data;
            return response;
        },
        error => {
            if (process.client) {
            }else{
                console.log('err',error)
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
        })
}