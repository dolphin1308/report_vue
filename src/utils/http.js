import axios from 'axios'

import { useTokenStore } from '@/stores/token.js'

const baseURL = '/api'
const instance = axios.create({ baseURL })

instance.interceptors.request.use(
  config => {
    const tokenStore = useTokenStore()
    if (tokenStore.token) {
      config.headers.Authorization = tokenStore.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  },
)

import router from '@/router/index.js'

instance.interceptors.response.use(
  result => {
    if (result.data.code === 200) {
      return result.data
    }
    console.log(result.data.msg ? result.data.msg : '服务异常')
    return Promise.reject(result.data)
  },
  error => {
    if (error.response.status === 401) {
      alert('请先登录')
      router.push('/login')
    } else {
      alert('服务异常')
    }
    return Promise.reject(error)
  },
)

export default instance
