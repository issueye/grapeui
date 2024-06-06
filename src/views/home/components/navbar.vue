<template>
  <div class="navbar-box">
    <span class="m-1" v-for="(item, index) in navBar" :key="index">
      {{ item.index }}
    </span>
  </div>
</template>

<script setup>
import { useMenuStore } from "@/store/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
const { navBar } = storeToRefs(menuStore);
</script>

<style lang="scss" scoped>
.navbar-box {
  height: 32px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>