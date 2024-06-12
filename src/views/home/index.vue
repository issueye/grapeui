<template>
  <div class="layout">
    <el-container class="h-full">
      <el-header>
        <Header />
      </el-header>
      <div class="flex flex-row h-full">
        <Menu class="shadow-xl z-50" :style="{ width: menuWidth }" />
        <div class="grow flex flex-col w-full bg-[#F0F2F5]">
          <NavBar />
          <div class="m-[10px] grow">
            <RouterView />
          </div>
        </div>
      </div>
      <!-- <el-container>
        <el-aside :width="menuWidth" class="shadow-xl z-50">
          <Menu />
        </el-aside>
        <div class="flex flex-col w-full bg-[#F0F2F5]">
          <NavBar />
          <div class="m-[10px] grow">
            <RouterView />
          </div>
        </div>
      </el-container> -->
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
}
</style>