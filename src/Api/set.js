import request from '@/utils/request'
export function ApiUpdataUser(data) {
    return request({
        url: 'api/updatauser',
        method: 'post',
        data
    })
}