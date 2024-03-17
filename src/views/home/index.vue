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
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Header from './components/header.vue';
import Menu from './components/menu.vue';

import { useMenuStore } from '@/store/menu'

const menuStore = useMenuStore()

const { menuWidth } = storeToRefs(menuStore)
console.log('menuWidth', menuWidth);

</script>

<style lang="scss" scoped>
    .layout{
        height: 100%;
        width: 100%;

        .el-container{
            height: 100%;

            .el-aside {
              box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
            }

            .el-main {
                background-color: #F0F2F5;
            }
        }
    }
</style>