<template>
  <BsHeader title="页面管理" description="页面管理" />
  <div class="main-box">
    <el-row>
      <el-col :span="6">
        <div class="left-box">
          <PortManagement />
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right-box">
          <PageCommon />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
      
<script setup>
import PortManagement from "./components/port_management.vue";
import PageCommon from "./components/page_common.vue";
</script>
      
<style lang="scss">
.main-box {
  height: calc(100% - 100px);

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
</style>
      