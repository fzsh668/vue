import request from '@/utils/request'
export function login(data) {
    return request({
        url: 'api/login/index',
        method: 'post',
        data
    })
}
export function getInfo(token) {
    return request({
        url: 'api/user',
        method: 'post',
        params: { token }
    })
}