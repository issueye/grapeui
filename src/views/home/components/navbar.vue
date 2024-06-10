<template>
  <div class="flex flex-row navbar-box">
    <div
      v-for="(item, index) in navBar"
      :key="index"
      class="flex items-center h-full w-28 pl-2 border border-slate-300 hover:border-indigo-300"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from "@/store/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
const { navBar, indexTabbar } = storeToRefs(menuStore);

const rightMenuData = [
  { label: "关闭当前", value: "now" },
  { label: "关闭其他", value: "other" },
  { label: "关闭全部", value: "all" },
];

const onContextMenu = (e) => {
  //prevent the browser's default menu
  e.preventDefault();
  //show our menu
  this.$contextmenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: "A menu item",
        onClick: () => {
          alert("You click a menu item");
        },
      },
      {
        label: "A submenu",
        children: [{ label: "Item1" }, { label: "Item2" }, { label: "Item3" }],
      },
    ],
  });
};

const onTabClick = () => {};

const onRemoveTabClick = (name) => {
  console.log("tab:remove -> name", name);
  menuStore.removeBar({ index: "", title: name });
};

const contextMenuClick = (obj, e) => {};
</script>

<style lang="scss" scoped>
.navbar-box {
  height: 32px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>