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
 * 刷新统计信息
 * @param {*} params 
 * @returns 
 */
export const apiPortRefreshStatistics = () => {
    return request({
        url: 'api/v1/port/refreshStatistics',
        method: 'get',
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
 * @param {*} id 
 * @returns 
 */
export const apiPortModifyState = (id) => {
    return request({
        url: `api/v1/port/state/${id}`,
        method: 'put',
    })
}

/**
 * 启动监听端口号
 * @param {*} id 
 * @returns 
 */
export const apiPortGzip = (id) => {
    return request({
        url: `api/v1/port/gzip/${id}`,
        method: 'put',
    })
}

/**
 * 启动监听端口号
 * @param {*} id 
 * @returns 
 */
export const apiPortStart = (id) => {
    return request({
        url: `api/v1/port/start/${id}`,
        method: 'put',
    })
}

/**
 * 关闭监听端口号
 * @param {*} id 
 * @returns 
 */
export const apiPortStop = (id) => {
    return request({
        url: `api/v1/port/stop/${id}`,
        method: 'put',
    })
}

/**
 * 重启监听端口号
 * @param {*} id 
 * @returns 
 */
export const apiPortReload = (id) => {
    return request({
        url: `api/v1/port/reload/${id}`,
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