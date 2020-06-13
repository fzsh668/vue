import request from '@/utils/request'
export function ApiRegister(data) {
    return request({
        url: 'api/register/register/',
        method: 'post',
        data
    })
}