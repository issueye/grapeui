<template>
    <div class="login-page">
        <div class="login-box">
            <div>
                <img src="@/assets/flower-login.jpg" alt="" width="300px" height="379px">
            </div>
            <div>
                <div class="login-sys-title">代理服务管理系统</div>
                <div class="login-form-box">
                    <el-form>
                        <el-form-item label="用户">
                            <el-input v-model="form.user" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password" />
                        </el-form-item>

                        <el-button type="primary" class="login-btn">登录</el-button>
                    </el-form>
                </div>
            </div>
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
.login-page {
    background: #EBEEEF;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
        display: flex;
        background-color: #FFF;
        width: 600px;
        height: 379px;
        border-radius: 10px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

        img {
            border-radius: 10px 0 0 10px;
        }

        .login-sys-title {
            position: relative;
            top: 40px;
            left: 60px;
            font-size: 24px;
            font-weight: 600;
            color: #597a85;
        }

        .login-form-box {
            position: relative;
            left: 30px;
            top: 100px;

            .login-btn {
                position: relative;
                top: 20px;
                left: 40px;
                width: 177px;
            }
        }
    }
}
</style>