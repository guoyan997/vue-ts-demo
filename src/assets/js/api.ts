/**
 * @description 接口
 */
import axios from 'axios'
import qs from 'qs'
import {
  stringToDate
} from './weapon'
let HOST = process.env.VUE_APP_API_HOST || '' // 开发环境
HOST = 'http://bdata_mobile.shuixing.cn/InterfacePlatform/requerstInterface/queryInterface/'
const axiosConfig = {
  method: 'POST',
  // 基础url前缀
  baseURL: '',
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'token': '123123',
    'IdentifyingCode': window.localStorage.getItem('IdentifyingCode')
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}
// axios.interceptors.request.use(function (config) {
//   return config
// })
interface IResponse {
  __statusCode: string,
  data: any
}
const API = {
  // 示例
  getDataFromInterface (url: string, params = {}, options = {}): any {
    const configs: any = {
      ...axiosConfig,
      url,
      data: qs.stringify(params),
      ...options
    }
    return new Promise<IResponse>((resolve, reject) => {
      axios(configs)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  // getUserCropId: HOST + 'dd/getDingInfo',
  getIdentifyingCode: 'http://bdata_mobile.shuixing.cn/InterfacePlatform/validate/getIdentifyingCode',
  casUrl: 'http://bdata_mobile.shuixing.cn/InterfacePlatform/validate/TestCall',
  getBarData: HOST + '1946e8a0fd0b4f4abc50a9c7f177c5c7'
}
// 利用时间戳查询接口平台，并判断时间戳过期时间，进行重新查询
axios.interceptors.request.use(
  (config: any) => {
    const url: any = config.url
    if (url.indexOf('getIdentifyingCode') > -1) {
      // 以上接口直接放过，不需要添加时间戳
      return config
    } else {
      // 判断时间戳是否过期
      const idCode = window.localStorage.getItem('IdentifyingCode')
      const outTimer = window.localStorage.getItem('ExpiryTime')
      const nowTimer = new Date()
      if (outTimer) {
        // const beyonedTime = stringToDate(outTimer) - nowTimer
        // 如果时间戳过期时间大于现在的时间，那么发送请求，
        if (stringToDate(outTimer) > nowTimer) {
          if (idCode) {
            // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.IdentifyingCode = idCode
          }
          return config
        } else {
          // 如果时间戳过期了，那么就要从新获取时间戳
          return new Promise((resolve, reject) => {
            axios.post(API.getIdentifyingCode).then((res: any) => {
              const data = res.data.data
              window.localStorage.setItem('IdentifyingCode', data.IdentifyingCode)
              window.localStorage.setItem('ExpiryTime', data.ExpiryTime)
              resolve(config)
            }).catch((err: any) => {
              reject(err)
            })
          })
        }
      } else {
        // 如果时间戳的过期时间丢失，那么要重新获取时间戳信息
        return new Promise((resolve, reject) => {
          axios.post(API.getIdentifyingCode).then((res: any) => {
            const data = res.data.data
            window.localStorage.setItem('IdentifyingCode', data.IdentifyingCode)
            window.localStorage.setItem('ExpiryTime', data.ExpiryTime)
            resolve(config)
          }).catch((err: any) => {
            reject(err)
          })
        })
      }
    }
  },
  (err: any) => {
    return Promise.reject(err)
  })
export default API
