import request from '../axios';

/**
 * 获取gzip过滤信息列表
 * @param {*} params 
 * @returns 
 */
export const apiGzipFilterList = (params) => {
    return request({
        url: 'api/v1/gzipFilter',
        method: 'get',
        params: params,
    })
}

/**
 * 创建gzip过滤信息
 * @param {*} data 
 * @returns 
 */
export const apiGzipFilterCreate = (data) => {
    return request({
        url: 'api/v1/gzipFilter',
        method: 'post',
        data: data,
    })
}

/**
 * 编辑gzip过滤信息
 * @param {*} data 
 * @returns 
 */
export const apiGzipFilterModify = (data) => {
    return request({
        url: `api/v1/gzipFilter/${data.id}`,
        method: 'put',
        data: data,
    })
}

/**
 * 删除gzip过滤信息
 * @data {*} data 
 * @returns 
 */
export const apiGzipFilterDelete = (id) => {
    return request({
        url: `api/v1/gzipFilter/${id}`,
        method: 'delete',
    })
}