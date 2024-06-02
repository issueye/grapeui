<template>
  <BsHeader title="页面管理" description="页面管理" />
  <div class="main-box">
    <el-row>
      <el-col :span="4">
        <div class="left-box">
          <PortManagement />
        </div>
      </el-col>
      <el-col :span="20">
        <div class="right-box">
          <el-tabs v-model="activeName" type="card" @tab-click="onTabsClick">
            <el-tab-pane label="页面管理" name="page">
              <PageCommon />
            </el-tab-pane>
            <el-tab-pane label="转发管理" name="proxy">
              <ProxyRules />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
      
<script setup>
import PortManagement from "./components/port_management.vue";
import PageCommon from "./components/page_common.vue";
import ProxyRules from "./components/proxy_rules.vue";
import { ref } from "vue";

const activeName = ref("page");

const onTabsClick = () => {};
</script>
      
<style lang="scss">
.main-box {
  height: calc(100% - 46px);

  .el-row {
    height: 100%;
  }

  .left-box {
    padding: 10px;
    border-right: 1px solid #d9d9d9;
    height: calc(100% - 20px);
    background-color: #fff;
  }

  .right-box {
    padding: 10px;
    height: calc(100% - 20px);
    background-color: #fff;
  }
}

.el-tabs {
  --el-tabs-header-height: 32px;
}
</style>
      