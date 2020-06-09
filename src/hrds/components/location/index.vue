<template>
<el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group>
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
            <span v-if='index==levelList.length-1' class="no-redirect">{{item.name}}</span>
            <router-link v-else :to="item.redirect||item.path" @click.prevent="handleLink(item)">{{item.name}}</router-link>
        </el-breadcrumb-item>
    </transition-group>
</el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import * as AllFun from './location'
export default {
    name: "idnex",
    data() {
        return {
            levelList: null,
            deflink:''
        }
    },
    created() {
        this.getBreadcrumb()
       
    },
  
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    methods: {
        deflinkFun(){
             AllFun.getDefaultPage().then(res => {
            return res.data;
        });
        },
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)
            const first = matched[0].name
                console.log(this.deflink)

            if (first== 'home') {
                matched = [{
                    path: '/',
                    meta: {
                        title: 'Home'
                    }
                }].concat(matched)
            }
            this.levelList = matched
        },
        handleLink(item) {
            const {
                params
            } = this.$route
            const {
                redirect,
                path
            } = item
            var PathRule = pathToRegexp.compile(path)
            if (redirect) {
                this.$router.push(redirect)
                return
            }
            this.$router.push(PathRule(params))
        }
    }
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
