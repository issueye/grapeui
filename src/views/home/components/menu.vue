<template>
  <div class="menu-box">
    <el-menu router :collapse-transition="false" :unique-opened="true" :collapse="isCollapse"
      :default-active="defaultActive" :default-openeds="defaultOpeneds">
      <el-menu-item index="/dashboard" style="border-bottom: 1px solid #d9d9d9">
        <el-icon>
          <House />
        </el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-sub-menu index="/page" style="border-bottom: 1px solid #d9d9d9">
        <template #title>
          <el-icon>
            <Memo />
          </el-icon>
          <span>页面管理</span>
        </template>

        <el-menu-item index="/page/page_management">页面管理</el-menu-item>
        <el-menu-item index="/page/target_management">服务地址管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/system">
        <template #title>
          <el-icon>
            <Setting />
          </el-icon>
          <span>系统设置</span>
        </template>

        <el-menu-item index="/system/user_management">用户管理</el-menu-item>
        <el-menu-item index="/system/auth_group_management">用户组管理</el-menu-item>
        <el-menu-item index="/system/menu_management">菜单管理</el-menu-item>
      </el-sub-menu>
    </el-menu>

    <div class="collapse-box">
      <!-- <img src="@/assets/collapse.png" alt="" @click="collapseClick" /> -->
      <svg-icon class="cvg-collapse-box" iconName="collapse" size="20" @click="collapseClick" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMenuStore } from "@/store/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
const { isCollapse, collapseLeft, collapseRotate } = storeToRefs(menuStore);

const defaultActive = ref("");
const defaultOpeneds = ref([]);

const collapseClick = () => {
  menuStore.changeCollapse();
};
</script>

<style lang="scss" scoped>
.menu-box {
  .collapse-box {
    position: absolute;
    left: v-bind(collapseLeft);
    top: 50%;

    .cvg-collapse-box {
      width: 70px;
      height: 30px;
      transform: v-bind(collapseRotate);
    }
  }
}
</style>
