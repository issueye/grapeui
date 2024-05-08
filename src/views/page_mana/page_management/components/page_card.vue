<template>
  <el-card>
    <el-image :src="data.imgUrl || defaultImg" :fit="fit" />
    <div class="body">
      <div class="title">
        {{ data.title ? data.title : "这是一条测试内容" }}
      </div>
      <div class="version">
        版本：{{ data.version ? data.version : "v1.0.0.beta" }}
      </div>
    </div>
    <div class="actions">
      <el-button color="#626aef" :icon="Edit" @click="onEditClick" />
      <el-button type="primary" :icon="Delete" @click="onDeleteClick" />
    </div>
  </el-card>
</template>

<script setup>
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import { ref, toRefs, version } from "vue";
import defaultImg from "@/assets/images/default.png";

const props = defineProps({
  data: {
    id: "",
    title: "",
    name: "",
    version: "",
    portId: "",
    fileName: "",
    mark: "",
    imlUrl: "static/www/images/page-00003.jpg",
  },
});

const { data } = toRefs(props);
console.log("data", data);

const emits = defineEmits(["edit", "delete"]);

const onEditClick = () => {
  emits("edit", props.data);
};

const onDeleteClick = () => {
  emits("delete", props.data);
};
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
  height: 280px;

  .el-image {
    width: 100%;
    height: 150px;
    object-fit: none;
  }

  .body {
    height: 52px;
    .title {
      margin: 10px 0;
      font-size: 16px;
      font-weight: 500;
    }

    .version {
      margin-top: 10px;
      font-size: 14px;
      color: #bcbcbc;
    }
  }

  .actions {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
}

::v-deep .el-card__body {
  padding: 10px;
}
</style>