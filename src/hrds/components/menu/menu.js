/**
 * 定义菜单的数据结构
 * 这里的数据后期会从后台返回
 * 
 */
import request from '@/utils/request'
export function getMenu() {
    return request({
        url: '/A/login/getMenu',
    });
}
export function getDefaultPage() {
    return request({
        url: '/A/login/getDefaultPage',
    })
  }
  /* 
const Menu = [
    { icon: 'el-icon-setting', title: '系统参数', path: '/syspara' },





    // {
    //     //如果有二级菜单只需要添加 children即可,数据结构和一级菜单保持一致
    //     icon: 'el-icon-menu', title: '二级路由菜单例子', children: [
    //         { icon: 'el-icon-setting', title: '系统参数', path: '/syspara' },
    //         { icon: 'el-icon-document', title: 'Agent部署', path: '/agentdeploy' },
    //         { icon: 'el-icon-document', title: '采集监控首页', path: '/collectmonitor' }]
    // },
]

export default Menu; */