import axios from 'axios'
/**
 * [request_get 封装get请求]
 * @param  {[string]} url [请求地址]
 * @return {[object]}     [promise]
 */

export const requestGet = (url) => {
  return new Promise(function (resolve, reject) {
    axios.get(url).then(res => {
      if (res.data.success === true) {
        resolve(res.data)
      } else {
        reject(new Error('参数报错'))
      }
    })
  })
}

/**
 * [request_post 封装post请求]
 * @param  {[string]} url  [请求地址]
 * @param  {[object]} data [数据]
 * @return {[object]}      [promise]
 */

export const requestPost = (url, val) => {
  return new Promise(function (resolve, reject) {
    axios.post(url, val).then(res => {
      console.log(res)
      if (res.data.success === true) {
        resolve(res.data)
      } else {
        reject(new Error('参数报错'))
      }
    })
  })
}
