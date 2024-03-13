<template>
<el-menu router :collapse-transition="false" :unique-opened="true" :default-active="defaultActive" :default-openeds="defaultOpeneds">
    <el-menu-item index="/dashboard" style="border-bottom: 1px solid #D9D9D9;">
        <template #title>
            <el-icon>
                <Menu />
            </el-icon>
            <span>首页</span>
        </template>
    </el-menu-item>
    <el-sub-menu index="/page" style="border-bottom: 1px solid #D9D9D9;">
        <template #title>
            <el-icon><Memo /></el-icon>
            <span>页面管理</span>
        </template>

        <el-menu-item index="/page/page_management">页面管理</el-menu-item>
        <el-menu-item index="/page/target_management">服务地址管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/system">
        <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
        </template>

        <el-menu-item index="/system/user_management">用户管理</el-menu-item>
        <el-menu-item index="/system/auth_group_management">用户组管理</el-menu-item>
        <el-menu-item index="/system/menu_management">菜单管理</el-menu-item>
    </el-sub-menu>
</el-menu>
</template>

<script setup>
import {
    ref
} from "vue";

const defaultActive = ref('')
const defaultOpeneds = ref([])
</script>

<style lang="scss" scoped>
</style>
