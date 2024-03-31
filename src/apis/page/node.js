import request from '../axios';

/**
 * 获取页面列表
 * @param {*} params 
 * @returns 
 */
export const apiNodeList = (params) => {
    return request({
        url: 'api/v1/node',
        method: 'get',
        params: params,
    })
}

/**
 * 创建页面
 * @param {*} data 
 * @returns 
 */
export const apiNodeCreate = (data) => {
    return request({
        url: 'api/v1/node',
        method: 'post',
        data: data,
    })
}

/**
 * 编辑页面
 * @param {*} data 
 * @returns 
 */
export const apiNodeModify = (data) => {
    return request({
        url: `api/v1/node/${data.id}`,
        method: 'put',
        data: data,
    })
}

/**
 * 修改页面状态
 * @param {*} data 
 * @returns 
 */
export const apiNodeModifyState = (id) => {
    return request({
        url: `api/v1/node/state/${id}`,
        method: 'put',
    })
}


/**
 * 删除页面
 * @data {*} data 
 * @returns 
 */
export const apiNodeDelete = (id) => {
    return request({
        url: `api/v1/node/${id}`,
        method: 'delete',
    })
}