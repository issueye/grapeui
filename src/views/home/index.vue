<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside :width="menuWidth">
          <Menu />
        </el-aside>
        <el-main>
          <NavBar />
          <div class="m-[10px] h-5/6">
            <RouterView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import Header from "./components/header.vue";
import Menu from "./components/menu.vue";
import NavBar from "./components/navbar.vue";

import { useMenuStore } from "@/store/menu";

const menuStore = useMenuStore();

const { menuWidth } = storeToRefs(menuStore);
console.log("menuWidth", menuWidth);
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;

  .el-container {
    height: 100%;

    .el-aside {
      // box-shadow: 1px 0px 3px rgba(25, 41, 63, 0.1);
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      z-index: 999;
    }

    .el-main {
      background-color: #f0f2f5;
      padding: 0px;
      height: 100%;

      .main-container {
        margin: 15px;
        height: calc(100% - 70px);
      }
    }
  }
}
</style>