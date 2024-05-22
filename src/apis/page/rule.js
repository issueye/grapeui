import request from '../axios';

/**
 * 获取匹配规则列表
 * @param {*} params 
 * @returns 
 */
export const apiRuleList = (params) => {
    return request({
        url: 'api/v1/rule',
        method: 'get',
        params: params,
    })
}

/**
 * 创建匹配规则
 * @param {*} data 
 * @returns 
 */
export const apiRuleCreate = (data) => {
    return request({
        url: 'api/v1/rule',
        method: 'post',
        data: data,
    })
}

/**
 * 编辑匹配规则
 * @param {*} data 
 * @returns 
 */
export const apiRuleModify = (data) => {
    return request({
        url: `api/v1/rule`,
        method: 'put',
        data: data,
    })
}

/**
 * 修改匹配规则状态
 * @param {*} data 
 * @returns 
 */
export const apiRuleModifyState = (id) => {
    return request({
        url: `api/v1/rule/state/${id}`,
        method: 'put',
    })
}


/**
 * 删除匹配规则
 * @data {*} data 
 * @returns 
 */
export const apiRuleDelete = (id) => {
    return request({
        url: `api/v1/rule/${id}`,
        method: 'delete',
    })
}