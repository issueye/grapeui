<template>
    <BsHeader title="用户管理" description="用户管理">
        <template #actions>
            <el-button type="primary">添加</el-button>
        </template>
    </BsHeader>
    <BsMain>
        <template #body>
            <el-form inline>
                <el-form-item label="检索">
                    <el-input v-model="form.condition" placeholder="请输入检索内容" size="normal" clearable @change="onChange" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onQryClick">查询</el-button>
                </el-form-item>
            </el-form>

            <div>
                <vxe-table border :data="tableData" size="small" stripe auto-resize>
                    <vxe-column field="id" title="编码" />
                    <vxe-column field="account" title="账户" />
                    <vxe-column field="name" title="姓名" />
                    <vxe-column field="groupName" title="用户组" />
                    <vxe-column title="操作" width="130" align="center">
                        <el-button type="primary" text size="small" @click="onEditClick">编辑</el-button>
                        <el-button type="danger" text size="small" @click="onEditClick">删除</el-button>
                    </vxe-column>
                </vxe-table>

                <div style="margin-top: 10px;">
                    <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
                </div>
            </div>
        </template>
    </BsMain>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
    condition: '',
})

const tableData = ref([
    { id: '1000', name: '管理员', account: 'admin', groupName: '管理员' },
    { id: '1001', name: '测试', account: 'test', groupName: '测试组' },
])

const onChange = () => { }

const onQryClick = () => { }

const onEditClick = () => { }

</script>

<style lang="scss"></style>