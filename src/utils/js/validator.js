import regular from '@/utils/js/regular'
/**
 * 
 * @param {String} customRule 自定义检测规则
 * @param {String} str 检查的值
 * @returns {Boolean}  
 */
export function customStr(ruleStr, value) {
    return ruleStr.test(value)
}


/**
 * @param {string} type 验证类型
 * @returns {Boolean} 是否符合
 */
export function checkValid(type, value) {
    return regular[type]['regex'].test(value)
}


export default {
    default: [{ required: true, message: '该输入项为必填项', trigger: 'blur' }],
    selected: [{ required: true, message: '请至少选择一项', trigger: 'change' }],
    checked: [{ required: true, message: '请至少选择一项', trigger: 'change' }],
}