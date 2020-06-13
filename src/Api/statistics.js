import request from '@/utils/request'
//运营中心查询SPU列表  Api

//供应商列表
export function ApiGetcurrent(data) {
    return request({
        url: 'api/statistics/index',
        method: 'post',
        data
    })
}
export function ApiSetstatistics(data) {
    return request({
        url: 'api/statistics/setmax',
        method: 'post',
        data
    })
}