<template>
  <el-card style="transform: rotate(360deg)">
    <el-icon
      style="position: fixed; top: 5px; right: 5px; z-index: 10"
      @click="onDeleteClick"
      ><Close
    /></el-icon>
    <div style="display: flex; flex-direction: column; height: 100%">
      <el-image :src="data.imgUrl || defaultImg" fit="cover" />
      <div class="body">
        <div class="title">
          {{ data.title ? data.title : "这是一条测试内容" }}
        </div>
        <div class="version">
          版本：{{ data.version ? data.version : "无" }}
        </div>
      </div>
      <el-divider />
      <div class="actions">
        <el-button circle color="#626aef" :icon="Edit" @click="onEditClick" />
        <el-button
          circle
          color="#ee3f4d"
          :icon="VideoPause"
          @click="onStateClick"
        />
        <!-- <el-button
          color="#ee3f4d"
          size="small"
          :icon="Delete"
          @click="onDeleteClick"
        /> -->
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Edit, VideoPlay, VideoPause } from "@element-plus/icons-vue";
import { toRefs } from "vue";
import defaultImg from "@/assets/images/default.png";

const props = defineProps({
  data: {
    id: "",
    title: "",
    name: "",
    version: "",
    portId: "",
    mark: "",
    imlUrl: "static/www/images/page-00003.jpg",
  },
});

const { data } = toRefs(props);
console.log("data", data);

const emits = defineEmits(["edit", "delete"]);

// 修改信息
const onEditClick = () => {
  emits("edit", props.data);
};

// 删除
const onDeleteClick = () => {
  emits("delete", props.data);
};

// 修改状态
const onStateClick = () => {};
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
  height: 262px;

  .el-image {
    width: 100%;
    height: 140px;
    object-fit: none;
  }

  .body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    padding: 12px 16px;
    height: calc(100% - 200px);
    .title {
      font-size: 16px;
      font-weight: 500;
    }

    .version {
      margin-top: 8px;
      font-size: 14px;
      color: #bcbcbc;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin: 8px 12px;
    height: 32px;
  }
}

::v-deep(.el-card__body) {
  padding: 0px;
  height: 100%;
}

::v-deep(.el-divider--horizontal) {
  margin: 0px;
  border-top: 1px solid #f0f2f5;
}
</style>