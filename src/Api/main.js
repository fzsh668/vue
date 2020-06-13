import request from '@/utils/request'
export function ApiPhoneList(data) {
    return request({
        url: 'api/index/phone/index',
        method: 'post',
        data
    })
}
export function ApiGetPhone(data) {
    return request({
        url: 'api/index/phone/index',
        method: 'post',
        data
    })
}
export function ApiPhoneInsert(data) {
    return request({
        url: 'api/index/phone/phoneInsert',
        method: 'post',
        data
    })
}
export function ApiPhoneEdit(data) {
    return request({
        url: 'api/index/phone/phoneedit',
        method: 'post',
        data
    })
}
export function ApiGetPerson(data) {
    return request({
        url: 'api/index/person/index',
        method: 'post',
        data
    })
}
export function ApiGetSource(data) {
    return request({
        url: 'api/index/source/index',
        method: 'post',
        data
    })
}
export function ApiGetRecord(data) {
    return request({
        url: 'api/index/record/index',
        method: 'post',
        data
    })
}
/*export function ApiSourceDetail(data) {
    return request({
    url: 'api/index/source/update/index',
    method: 'post',
    data
})
}*/
export function ApiSourceUpdata(data) {
    return request({
        url: 'api/index/source/update/index',
        method: 'post',
        data
    })
}

export function ApiSign(data) {
    return request({
        url: 'api/index/sign/index',
        method: 'post',
        data
    })
}
export function ApiAddSign(data) {
    return request({
        url: 'api/index/sign/index/addsign',
        method: 'post',
        data
    })
}
export function ApiMonthCost(data) {
    return request({
        url: 'api/index/sign/monthcost',
        method: 'post',
        data
    })
}


export function ApiAllsign(data) {
    return request({
        url: 'api/index/sign/allsign',
        method: 'post',
        data
    })
}

export function ApiSignDetail(data) {
    return request({
        url: 'api/index/sign/detail',
        method: 'post',
        data
    })
}
export function ApiMycost(data) {
    return request({
        url: 'api/index/sign/allsign/mycost',
        method: 'post',
        data
    })
}
