<template>
<div class="login">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="80px">
        <el-form-item label="登录名" prop="user_id">
            <el-input v-model="ruleForm.user_id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import * as addTaskAllFun from "./login";
export default {
    name: "Login",
    mounted() {
        // 绑定enter事件
        this.enterKeyup();
    },
    destroyed() {
        // 销毁enter事件
        this.enterKeyupDestroyed();
    },
    data() {
        var validateLoginName = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                callback();
            }
        };
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            link: "",
            ruleForm: {
                user_id: "",
                password: ""
            },
            rules: {
                user_id: [{
                    required: true,
                    validator: validateLoginName,
                    trigger: "blur"
                }],
                password: [{
                    required: true,
                    validator: validatePassword,
                    trigger: "blur"
                }]
            },
            formLabelWidth: "60px"
        };
    },
    methods: {
        ...mapActions(["login"]),
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //这里项目正式使用时,请根据用户登陆验证的方式自行修改到默认页面
                    this.login(this.ruleForm).then(res => {
                        addTaskAllFun.getDefaultPage().then(res => {
                            this.$router.push("home");
                        });
                    });

                    //---------------模拟用户登陆----------------------
                    // if(this.ruleForm.user_id != '2001') {
                    //     this.$Msg.customizTitle("账号不存在","error")
                    // } else 
                    
                    // if(this.ruleForm.password != '2001') {
                    //     this.$Msg.customizTitle("密码错误","error")
                    // } else {

                    //     //验证成功跳转到指定的页面
                    //     this.$router.push("/home")
                    // }

                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        enterKey(event) {
            const componentName = this.$options.name;
            const code = event.keyCode ?
                event.keyCode :
                event.which ?
                event.which :
                event.charCode;
            if (componentName == "Login" && code === 13) {
                this.submitForm("ruleForm");
            }
        },
        enterKeyupDestroyed() {
            document.removeEventListener("keyup", this.enterKey);
        },
        enterKeyup() {
            document.addEventListener("keyup", this.enterKey);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.login {
    background: url("../../assets/bg13.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

.demo-ruleForm {
    position: relative;
    width: 25%;
    padding: 18%;
    margin: 0 auto;
    /* overflow: hidden; */
}
</style>
