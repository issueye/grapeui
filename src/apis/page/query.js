import request from '../axios';

/**
 * 获取端口号列表
 * @param {*} params 
 * @returns 
 */
export const apiGetHttpMessages = (params) => {
    return request({
        url: 'api/v1/query/httpMessages',
        method: 'get',
        params: params,
    })
}