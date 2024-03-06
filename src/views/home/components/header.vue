<template>
<div class="header-box">
    <div class="grape-title">
        <img src="@/assets/favicon_logosc/apple-touch-icon.png" style="width: 24px; height: 24px;"><span style="margin-left: 10px;">代理服务管理系统</span>
    </div>
    <div class="header-actions">
        <el-avatar :size="25">A</el-avatar>
        <el-dropdown class="user-name">
            <span class="el-dropdown-link" style="margin-left: 10px;">
                管理员 <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <svg-icon iconName="changepwd" color="#D9D9D9" :size="15" style="margin-right: 10px;" /> 修改密码</el-dropdown-item>
                    <el-dropdown-item>
                        <svg-icon iconName="logout" color="#D9D9D9" :size="15" style="margin-right: 10px;" /> 退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</div>
</template>

<script setup>
import {
    ArrowDown,
    Switch,
    BottomRight
} from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.header-box {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .grape-title {
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
    }

    .header-actions {
        margin-right: 10px;
        display: inline-flex;
        align-items: center;
    }

    .el-dropdown-link:focus {
      outline: none;
    }

    .user-name {
        display: inline-block;
        font-size: 15px;
        font-weight: bold;
        vertical-align: middle;
        color: white;
    }
}
</style>
