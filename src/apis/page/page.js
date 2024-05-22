import request from '../axios';

/**
 * 获取页面列表
 * @param {*} params 
 * @returns 
 */
export const apiPageList = (params) => {
    return request({
        url: 'api/v1/page',
        method: 'get',
        params: params,
    })
}

/**
 * 获取页面版本列表
 * @param {*} params 
 * @returns 
 */
export const apiPageVersionList = (productCode) => {
    return request({
        url: `api/v1/page/version/${productCode}`,
        method: 'get',
    })
}

/**
 * 创建页面
 * @param {*} data 
 * @returns 
 */
export const apiPageCreate = (data) => {
    return request({
        url: 'api/v1/page',
        method: 'post',
        data: data,
    })
}

/**
 * 编辑页面
 * @param {*} data 
 * @returns 
 */
export const apiPageModify = (data) => {
    return request({
        url: `api/v1/page`,
        method: 'put',
        data: data,
    })
}

/**
 * 修改页面状态
 * @param {*} data 
 * @returns 
 */
export const apiPageModifyState = (id) => {
    return request({
        url: `api/v1/page/state/${id}`,
        method: 'put',
    })
}


/**
 * 删除页面
 * @data {*} data 
 * @returns 
 */
export const apiPageDelete = (id) => {
    return request({
        url: `api/v1/page/${id}`,
        method: 'delete',
    })
}