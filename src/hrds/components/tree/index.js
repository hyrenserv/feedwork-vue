import request from '@/utils/request'
//获取WEB SQL控制台树菜单数据
export function getWebSQLTreeData(data) {
    return request({
        url: '/B/websqlquery/getWebSQLTreeData',
        params: data
    })
}
//根据表名获取采集数据，默认显示10条
export function queryDataBasedOnTableName(data) {
    return request({
        url: '/B/websqlquery/queryDataBasedOnTableName',
        params: data
    })
}