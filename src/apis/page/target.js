import request from '../axios';

/**
 * 获取目标地址列表
 * @param {*} params 
 * @returns 
 */
export const apiTargetList = (params) => {
    return request({
        url: 'api/v1/target',
        method: 'get',
        params: params,
    })
}

/**
 * 创建目标地址
 * @param {*} data 
 * @returns 
 */
export const apiTargetCreate = (data) => {
    return request({
        url: 'api/v1/target',
        method: 'post',
        data: data,
    })
}

/**
 * 编辑目标地址
 * @param {*} data 
 * @returns 
 */
export const apiTargetModify = (data) => {
    return request({
        url: `api/v1/target/${data.id}`,
        method: 'put',
        data: data,
    })
}

/**
 * 修改目标地址状态
 * @param {*} data 
 * @returns 
 */
export const apiTargetModifyState = (id) => {
    return request({
        url: `api/v1/target/state/${id}`,
        method: 'put',
    })
}


/**
 * 删除目标地址
 * @data {*} data 
 * @returns 
 */
export const apiTargetDelete = (id) => {
    return request({
        url: `api/v1/target/${id}`,
        method: 'delete',
    })
}