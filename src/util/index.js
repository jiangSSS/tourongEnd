import axios from "axios"
import * as Cookies from 'js-cookie'

const env = process.env.NODE_ENV  //生产环境下  被设置为production  
                                  //开发环境下  被设置为development
let baseURL = env == "development" ? "/api" :"/"
//   const baseURL = "http://192.168.4.11:8484"
  const instance = axios.create({
  baseURL,
  timeout:15000,
//   headers:{"Access-Control-Allow-Origin":*}
})

instance.interceptors.request.use( 
    config => {
      let userKey = Cookies.get("userKey")
      if (userKey) {  // 判断是否存在userKey，如果存在的话，则每个http header都加上userKey
          config.headers.userKey = userKey;
      }
      return config;
  },
    error  => {
        return Promise.reject(error );
    }
  )
  
const xhr = {
    fetch(url,data,config,methods){
        return new Promise((resolve,reject)=>{
            instance[methods](url,data,config).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    get(url,data,config){
        return this.fetch(url,data,config,"get")
    },
    put(url,data,config){
        return this.fetch(url,data,config,"put")
    },
    post(url,data,config){
        return this.fetch(url,data,config,"post")
    }
}
export const $axios = xhr