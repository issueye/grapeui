import request from '../axios';

/**
 * 获取端口号列表
 * @param {*} params 
 * @returns 
 */
export const apiPortList = (params) => {
    return request({
        url: 'api/v1/port',
        method: 'get',
        params: params,
    })
}

/**
 * 创建端口号
 * @param {*} data 
 * @returns 
 */
export const apiPortCreate = (data) => {
    return request({
        url: 'api/v1/port',
        method: 'post',
        data: data,
    })
}

/**
 * 编辑端口号
 * @param {*} data 
 * @returns 
 */
export const apiPortModify = (data) => {
    return request({
        url: `api/v1/port/${data.id}`,
        method: 'put',
        data: data,
    })
}

/**
 * 修改端口号状态
 * @param {*} data 
 * @returns 
 */
export const apiPortModifyState = (id) => {
    return request({
        url: `api/v1/port/state/${id}`,
        method: 'put',
    })
}


/**
 * 删除端口号
 * @data {*} data 
 * @returns 
 */
export const apiPortDelete = (id) => {
    return request({
        url: `api/v1/port/${id}`,
        method: 'delete',
    })
}