<template>
  <div class="navbar-box">
    <el-tabs v-model="indexTabbar" type="card" closable @tab-click="onTabClick" @tab-remove="onRemoveTabClick">
      <el-tab-pane v-for="(item, index) in navBar" :key="index" :name="item.name">
        <context-menu v-model:show="show" :options="optionsComponent">
        </context-menu>
        <el-context-menu slot="label" :data="rightMenuData" @item-click="contextMenuClick(item, $event)">
          {{ item.title }}
        </el-context-menu>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { useMenuStore } from "@/store/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
const { navBar, indexTabbar } = storeToRefs(menuStore);

const rightMenuData = [
  { label: '关闭当前', value: 'now' },
  { label: '关闭其他', value: 'other' },
  { label: '关闭全部', value: 'all' },
]

const onTabClick = () => {

}

const onRemoveTabClick = (name) => {
  console.log('tab:remove -> name', name);
  menuStore.removeBar({ index: '', title: name })
}

const contextMenuClick = (obj, e) => {

}

</script>

<style lang="scss" scoped>
.navbar-box {
  height: 32px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>