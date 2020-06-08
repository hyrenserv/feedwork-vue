<template>
<div id='treen'>
    <el-col class="borderStyle">
        <!--树菜单-->
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
        <happy-scroll color="rgba(204, 200, 200, 0.6)" size="5" resize>
            <div class='mytree'>
                <el-tree class="filter-tree" :data="webSqlTreeData" :indent='0' @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree" @node-contextmenu="rightClick">
                    <span class="span-ellipsis" slot-scope="{ node, data }" v-if="data.description.length >0">
                        <span :title="data.description" v-if="data.file_id.length > 0">
                            <i class=" el-icon-document"></i>{{node.label}}
                        </span>
                        <span :title="data.description" v-else>
                            <i class="el-icon-folder-opened"></i>{{node.label}}
                        </span>
                    </span>
                    <span class="span-ellipsis" slot-scope="{ node, data }" v-else>
                        <span :title="data.label" v-if="data.file_id.length > 0">
                            <i class=" el-icon-document"></i>{{node.label}}
                        </span>
                        <span :title="data.label" v-else>
                            <i class="el-icon-folder-opened"></i>{{node.label}}
                        </span>
                    </span>
                </el-tree>
                
            </div>
        </happy-scroll>
    <span v-show="menuVisible" id="menu" class="menu" @mouseleave="foo" @click="copydatas">复制表名</span>

    </el-col>
    <!-- 复制小提示框 -->
</div>
</template>

<script>
import * as treeAllFun from "./index"
// import Scrollbar from '../../components/scrollbar';
export default {
    props: ['blongs'], //获得属于哪一个的数
    name: 'trees',
    /*  components:{
           Scrollbar
     }, */
    data() {
        return {
            webSqlTreeData: [],
            filterText: '',
            menuVisible: false,
            dataByTableName: [],
        }
    },
    watch: {
        //设置检索内容
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    mounted() {
        this.getWebSQLTreeData()
    },
    methods: {
        // 节点搜索
        filterNode(value, data) {
            // 如果检索内容为空,直接返回
            if (!value) return true;
            // 如果传入的value和data中的name相同说明是匹配到了,匹配时转小写匹配
            return data.hyren_name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        },
        getWebSQLTreeData() {
            treeAllFun.getWebSQLTreeData().then(res => {
                this.webSqlTreeData = res.data;
            });
        },
        //树点击触发
        handleNodeClick(data) {
            if (data.file_id !== '') {
                // 查询数据
                this.dataByTableName = [];
                treeAllFun.queryDataBasedOnTableName({
                    'tableName': data.hyren_name
                }).then((res) => {
                    this.dataByTableName = res.data;
                    this.$emit("eventName", this.dataByTableName)
                });
            }
        },
        // 树右键复制代码
        rightClick(MouseEvent, object, Node, element) {
            if (Node.data.file_id.length > 0) {
                this.copydata = Node.label;
                this.menuVisible = false;
                this.menuVisible = true;
                var menu = document.querySelector('#menu');
                document.addEventListener('click', this.foo);
                menu.style.display = "block";
                menu.style.left = MouseEvent.clientX-160+ 'px';
                menu.style.top = MouseEvent.clientY-100+ 'px';
            } else {
                return false;
            }
        },
        foo() {
            this.menuVisible = false
            document.removeEventListener('click', this.foo) //关闭事件监听
        },
        // 复制代码
        copydatas() {
            let tableName = this.copydata;
            let oInput = document.createElement('input');
            oInput.value = tableName;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象;
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.remove();
        },
    }
}
</script>

<style lang="less" scoped>
.menu {
    display: inline-block;
    text-align: center;
    height: 20px;
    line-height: 20px;
    width: 80px;
    left: 0px;
    top: 0px;
    font-size: 14px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
    z-index: 100;
    cursor: pointer;
}

/* #treen{
     .scrollbar-wrap {
        width: 22% !important;
        position: absolute;
        height: 500px;
        width: 200px !important;
    }

    .scrollbar__track {
        width: 4px;
    }
} */
.mytree /deep/ {
    .el-tree {
        height: 500px;
    }

    .el-tree>.el-tree-node:after {
        border-top: none;
    }

    .el-tree-node {
        position: relative;
        padding-left: 16px;
    }

    //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
    /*  .el-tree-node__expand-icon.is-leaf {
                display: none;
            } */

    .el-tree-node__children {
        padding-left: 16px;
    }

    .el-tree-node :last-child:before {
        height: 38px;
    }

    .el-tree>.el-tree-node:before {
        border-left: none;
    }

    .el-tree>.el-tree-node:after {
        border-top: none;
    }

    .el-tree-node:before {
        content: "";
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
    }

    .el-tree-node:after {
        content: "";
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
    }

    .el-tree-node:before {
        border-left: 1px dashed #4386c6;
        bottom: 0px;
        height: 100%;
        top: -26px;
        width: 1px;
    }

    .el-tree-node__content>.el-tree-node__expand-icon {
        padding: 0px;
    }

    .el-tree-node:after {
        border-top: 1px dashed #4386c6;
        height: 20px;
        top: 12px;
        width: 24px;
    }
}
</style>
