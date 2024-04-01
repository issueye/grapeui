<template>
  <el-card>
    <el-image :src="data.imgUrl || defaultImg" :fit="fit" />
    <div class="body">
      <div class="title">{{ data.title }}</div>
      <div class="version">版本：{{ data.version }}</div>
      <div class="actions">
        <el-button color="#626aef" :icon="Edit" @click="onEditClick" />
        <el-button type="primary" :icon="Delete" @click="onDeleteClick" />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import { ref, toRefs } from "vue";
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
  }
}

::deep .el-card__body {
  padding: 0px;
}
</style>