import http from '../utils/http'

// 查询登陆用户的信息
export const getLoginUserInfo = () => {
    return http.get('profile')
}
