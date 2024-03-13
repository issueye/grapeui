<template>
    <div class="login-box">
        <div>
            <img src="@/assets/login.jpg" alt="" style="width: 200px; height: 300px;">
        </div>
        <div>
            <el-form>
            <el-form-item label="用户">
                <el-input v-model="form.user" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" />
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';


const form = reactive({
    user: '',
    password: '',
})

</script>

<style lang="scss" scoped>
    .login-box{
        display: flex;
    }
</style>