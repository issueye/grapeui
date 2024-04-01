<template>
  <el-card>
    <el-image :src="props.imgUrl" :fit="fit" />
    <div class="body">
      <div class="title">排队加号系统</div>
      <div class="version">版本：v1.0.1</div>
      <!-- <div class="description">
        医院排队叫号系统是一种信息化服务系统，通过排队管理、叫号呼叫、预约挂号和数据统计等功能，提高就诊效率、改善就诊环境、提升服务质量并优化医疗资源分配。该系统的使用将越来越普及，为患者提供便捷高效的医疗服务。
      </div> -->
      <div class="actions">
        <el-button color="#626aef" :icon="Edit" />
        <el-button type="primary" :icon="Delete" />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";

const props = defineProps({
  imgUrl: {
    type: String,
    default: "/static/www/images/page-00002.jpg",
  },
});
</script>

<style lang="scss" scoped>
.el-card:hover {
  box-shadow: 0 1px 6px rgba(255, 255, 255, 0.932);
  border-color: #eee;
  transition: all 0.2s ease-in-out;
}

.el-card {
  margin: 10px;
  width: 260px;
  height: 300px;

  .el-image {
    width: 100%;
    height: auto;
  }

  .body {
    padding: 10px;

    .title {
      font-size: 26px;
      font-weight: 500;
    }

    .actions {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
    }

    .version {
      margin-top: 10px;
      font-size: 14px;
      color: #bcbcbc;
    }

    .description {
      margin-top: 15px;
      font-size: 12px;
      color: #bcbcbc;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2; //行数
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
    }
  }
}

::v-deep .el-card__body {
  padding: 0px;
}
</style>