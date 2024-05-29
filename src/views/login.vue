<template>
  <div class="login-page">
    <div class="login-box">
      <div>
        <img
          src="@/assets/images/flower-login.webp"
          alt=""
          width="300px"
          height="379px"
        />
      </div>
      <div>
        <div class="login-sys-title">代理服务管理系统</div>
        <div class="login-form-box">
          <el-form>
            <el-form-item label="用户">
              <el-input placeholder="请输入账户" v-model="form.account" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                placeholder="请输入密码"
                type="password"
                v-model="form.password"
              />
            </el-form-item>

            <el-button type="primary" class="login-btn" @click="loginClick"
              >登录</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { apiLogin } from "../apis/sys/user";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const route = useRouter();
const userStore = useUserStore();
let { info, token } = storeToRefs(userStore);

const form = reactive({
  account: "",
  password: "",
});

onMounted(() => {
  localStorage.clear();
  sessionStorage.clear();
})

const loginClick = async () => {
  let res = await apiLogin(form);
  if (res.code === 200) {
    localStorage.setItem("token", res.data.token);
    info.value = res.data;
    token.value = res.data.token;
    route.push("/");
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  background: #ebeeef;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    display: flex;
    background-color: #fff;
    width: 600px;
    height: 379px;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    img {
      border-radius: 10px 0 0 10px;
    }

    .login-sys-title {
      position: relative;
      top: 60px;
      left: 60px;
      font-size: 24px;
      font-weight: 600;
      color: #597a85;
    }

    .login-form-box {
      position: relative;
      left: 30px;
      top: 100px;
      width: 240px;

      .login-btn {
        position: relative;
        top: 20px;
        left: 40px;
        width: 199px;
      }
    }
  }
}
</style>