import request from '@/utils/request'

/**
 * 获取系统参数/模糊查询
 * @param {JSON} data 
 */
export function getSysPara(data) {
    return request({
        url: '/A/syspara/getSysPara',
        params: data
    })
}

/**
 * 新增系统参数
 * @param {JSON} data 
 */
export function addSysPara(data) {
    return request({
        url: '/A/syspara/addSysPara',
        params: data
    })
}

/**
 * 更新系统参数
 * @param {JSON} data 
 */
export function updateSysPara(data) {
    return request({
        url: '/A/syspara/updateSysPara',
        params: data
    })
}

/**
 * 删除系统参数
 * @param {JSON} data 
 */
export function deleteSysPara(data) {
    return request({
        url: '/A/syspara/deleteSysPara',
        params: data
    })
}

const syspara = [{ "para_id": 1, "para_name": "sys_Name", "para_type": "server.properties", "para_value": "海云数服", "remark": "系统名称最多输入8个字" }, { "para_id": 2, "para_name": "logo_img", "para_type": "server.properties", "para_value": "hyrenlogo.png", "remark": "系统logo图片名称" }, { "para_id": 3, "para_name": "logo_depict", "para_type": "server.properties", "para_value": "博彦科技(上海)有限公司", "remark": "logo描述信息" }, { "para_id": 12, "para_name": "platform", "para_type": "server.properties", "para_value": "normal", "remark": "normal:不做集群认证;cdh5_13:CDH平台认证;fic50、fic60、fic70、fic80:FI平台认证,不配置默认normal" }, { "para_id": 102, "para_name": "summary_volumn", "para_type": "server.properties", "para_value": "3", "remark": "摘要获取行数" }, { "para_id": 103, "para_name": "collection", "para_type": "server.properties", "para_value": "HrdsFullTextIndexing", "remark": "solr的collection" }, { "para_id": 108, "para_name": "isagenttohadoop", "para_type": "server.properties", "para_value": "2", "remark": "agent和集群是否在一台机器上2：在；1：不在" }, { "para_id": 110, "para_name": "hyren_port", "para_type": "server.properties", "para_value": "2000", "remark": "HYREN服务器接受进程端口" }, { "para_id": 111, "para_name": "hyren_osname", "para_type": "server.properties", "para_value": "linux", "remark": "HYREN服务器操作系统" }, { "para_id": 112, "para_name": "hyren_storedir", "para_type": "server.properties", "para_value": "/home/hyshf/HRDS/HrdsServer/bigserver/data/", "remark": "HYREN服务器数据传输落地目录" }]