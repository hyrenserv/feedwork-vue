<template>
<div class="login">
    <el-form :model="ruleForm" status-icon :rules="rule" ref="ruleForm" class="demo-ruleForm" label-width="80px">
        <el-form-item label="登录名" prop="user_id" :rules="rule.default">
            <el-input v-model="ruleForm.user_id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rule.default">
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
import * as validator from "@/utils/js/validator"
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
        return {
            link: "",
            ruleForm: {
                user_id: "",
                password: ""
            },
            rule: validator.default,
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
                            this.$router.push(res.data);
                        });
                    });
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
}
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
