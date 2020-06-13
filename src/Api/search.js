import request from '@/utils/request'
//运营中心查询SPU列表  Api

//供应商列表
export function ApiSearch(data) {
    return request({
        url: 'api/search/index',
        method: 'post',
        data
    })
}