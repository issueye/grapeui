<template>
<el-menu router>
    <el-menu-item index="1">首页</el-menu-item>
    <el-sub-menu index="2">
        <template #title>
            <el-icon>
                <location />
            </el-icon>
            <span>系统设置</span>
        </template>

        <el-menu-item index="/system/user_management">用户管理</el-menu-item>
    </el-sub-menu>
</el-menu>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.el-menu {
    border-right: none;
}
</style>
