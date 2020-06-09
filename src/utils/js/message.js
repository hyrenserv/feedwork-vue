import { Message, MessageBox } from 'element-ui'

/**
 * 
 * @param {Object} data 更新请求处理后的信息
 */
export function updateSuccess(data) {
    if (data && data.success) {
        Message({
            message: '更新成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
}

/**
 * 
 * @param {Object} data 删除请求处理后的信息
 */
export function deleteSuccess(data) {
    if (data && data.success) {
        Message({
            message: '删除成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
    else {
        return false;
    }
}
/**
 * 
 * @param {Object} data 保存请求处理后的信息
 */
export function saveSuccess(data) {
    if (data && data.success) {
        Message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
}

/**
 * 
 * @param {String} message : 操作完成提示的消息
 * @param {String} type : 提示消息的类型(success,warning,error)
 */
export function customizTitle(message, type) {
    Message({
        message: message,
        type: typeof type != 'undefined' ? type : 'success',
        duration: 5 * 1000
    })
}

/**
 * 
 * @param {String} titleMsg : 提示的消息 
 */
export function confirmMsg(titleMsg) {

    return MessageBox.confirm(titleMsg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
}

/**
 * 
 * @param {Object} data 发布请求处理后的信息
 */
export function issueSuccess(data) {
    if (data && data.success) {
        Message({
            message: '发布成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
}
export function sendSuccess(data) {
    if (data && data.success) {
        Message({
            message: '发送成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
}