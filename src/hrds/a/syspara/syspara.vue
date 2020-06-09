<template>
<div class="systemParameters">
    <el-row class="elRows">
        <!-- <i class="el-icon-coin"></i> -->
        <span>系统参数列表</span>
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true;" size="small">
            <i class="el-icon-circle-plus-outline"></i>新增系统参数
        </el-button>
    </el-row>

    <div class="lines"></div>

    <!-- <el-col :span="8" class="searchData">
        <el-input v-model="search" size="medium" @change="searchData" placeholder="系统参数名称">
            <el-button slot="append" icon="el-icon-search" @click="searchData" class="searchBtn">搜索</el-button>
        </el-input>
    </el-col> -->

    <el-table stripe :data="systemParameters" size="medium" border>
        <el-table-column type="index" label="序号" width="62" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="para_name" label="系统参数名称" width="140" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="para_value" label="系统参数值" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="para_type" label="系统参数类型 " width="150" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="系统参数备注" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" width="164">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" @keyup.enter.native="searchData" placeholder="系统参数名称">
                </el-input>
            </template>
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="dialogFormVisibleUpdate = true;handleEdit(scope.$index, scope.row);">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页内容 -->
    <el-row class="pagination">
        <el-pagination @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
    </el-row>
    <!-- 实现点击添加按钮进行页面数添加-->
    <!-- 添加的弹出表单 -->
    <el-dialog title="新增系统参数" :visible.sync="dialogFormVisibleAdd" :before-close="beforeCloseAdd">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label=" 系统参数名称" :label-width="formLabelWidth" prop="para_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.para_name" autocomplete="off" placeholder="请输入系统参数名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数值" :label-width="formLabelWidth" prop="para_value" :rules="filter_rules([{required: true}])">
                <el-input type="textarea" v-model="formAdd.para_value" autocomplete="off" placeholder="请输入系统参数值" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数类型" :label-width="formLabelWidth" prop="para_type" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.para_type" autocomplete="off" placeholder="请输入系统参数类型" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数备注" :label-width="formLabelWidth" prop="remark">
                <el-input type="textarea" v-model="formAdd.remark" autocomplete="off" placeholder="请输入系统参数备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="addSysPara('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 实现点击编辑按钮进行页面部门更新-->
    <!-- 编辑的弹出表单 -->
    <el-dialog title="更新系统参数信息" :visible.sync="dialogFormVisibleUpdate" :before-close="beforeClose">
        <el-form :model="formUpdate" ref="formUpdate">
            <el-form-item label=" 系统参数名称" :label-width="formLabelWidth" prop="para_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formUpdate.para_name" autocomplete="off" placeholder="请输入系统参数名称" :disabled="true" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数值" :label-width="formLabelWidth" prop="para_value" :rules="filter_rules([{required: true}])">
                <el-input type="textarea" v-model="formUpdate.para_value" autosize autocomplete="off" placeholder="请输入系统参数值" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数类型" :label-width="formLabelWidth" prop="para_type" :rules="filter_rules([{required: true}])">
                <el-input v-model="formUpdate.para_type" autocomplete="off" placeholder="请输入系统参数类型" :disabled="true" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数备注" :label-width="formLabelWidth" prop="remark">
                <el-input type="textarea" v-model="formUpdate.remark" autosize autocomplete="off" placeholder="系统参数备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="updateSysPara('formUpdate')" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./syspara";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
// 保存当前为第几页
let savecurrentPage;
export default {
    data() {
        return {
            systemParameters: [],
            totalItem: 0,
            search: '',
            currentPage: 1,
            pageSize: 10,
            dialogFormVisibleAdd: false,
            dialogFormVisibleUpdate: false,
            // 添加数据与导入源字段
            formAdd: {
            },
            formUpdate: {
            },
            formLabelWidth: "150px"
        }
    },
    created() {
        this.getSysPara("1");
    },
    methods: {
        // 获取系统参数列表信息
        getSysPara(e) {
            functionAll.getSysPara({
                currPage: e,
                pageSize: this.pageSize
            }).then((res) => {
                if (res && res.success) {
                    this.systemParameters = res.data.sysParas;
                    this.totalItem = res.data.totalSize;
                }
            })
        },
        // 添加新的系统参数信息
        addSysPara(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.addSysPara(this.formAdd).then((res) => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            })
                            this.getSysPara("1");
                            this.currentPage = 1;
                            this.dialogFormVisibleAdd = false;
                            this.formAdd = {};
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 点击添加弹出框的取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            this.formUpdate = {};
            // 隐藏对话框
            this.getSysPara(savecurrentPage);
            this.dialogFormVisibleAdd = false;
            this.dialogFormVisibleUpdate = false;
            this.$refs.formUpdate.resetFields();
        },
        // 清空表单验证
        beforeCloseAdd() {
            this.formAdd = {};
            this.dialogFormVisibleAdd = false;
            this.$refs.formAdd.resetFields();
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.para_id = row.para_id;
            this.formUpdate = Object.assign({}, row);
            this.para_name = row.para_name;
        },
        //编辑参数信息
        updateSysPara(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.formUpdate["para_id"] = this.para_id;
                    functionAll.updateSysPara(this.formUpdate).then((res) => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '更新成功!'
                            })
                            // 渲染页面
                            this.currentPage = savecurrentPage
                            this.getSysPara(savecurrentPage);
                            this.dialogFormVisibleUpdate = false;
                            this.formUpdate = {};
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.getSysPara(savecurrentPage);
            this.dialogFormVisibleUpdate = false;

        },
        // 获取数据管理列表数据实现分页功能
        handleCurrentChangeList(val) {
            //把val赋给当前页面
            savecurrentPage = val;
            this.currentPage = val;
            this.getSysPara(val)
        },
        // 改变每页显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getSysPara("1");
            this.currentPage = 1;
        },
        // 实现查询功能
        searchData() {
            functionAll.getSysPara({
                currPage: savecurrentPage,
                pageSize: this.pageSize,
                paraName: this.search
            }).then((res) => {
                if (res && res.success) {
                    this.systemParameters = res.data.sysParas;
                    this.totalItem = res.data.totalSize;
                }
            })
        }
    }
}
</script>

<style scoped>
.el-row {
    height: 64px;
    line-height: 64px;
    width: 100%;
}

.searchData {
    margin-bottom: 4px;
}

.elRows {
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.el-icon-coin,
.el-row span {
    color: #2196f3;
    font-size: 18px;
}

.lines {
    margin-top: 4px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

/* button样式设置 */
.els {
    float: right;
    margin-top: 3px;

}

.el1 {
    margin-left: 10px;
}

.item {
    float: right;
}

.upload-demo {
    float: left;
}

.fa-question-circle {
    margin-top: 12px;
}

.searchBtn:hover {
    background-color: #409EFF;
    color: #FFF;
}

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}

/* 搜索框样式 */
.systemParameters>>>.el-table th {
    padding: 7px 0;
}
</style>
