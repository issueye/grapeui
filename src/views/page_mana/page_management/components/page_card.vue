<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <div
          style="
            display: inline-flex;
            justify-content: space-between;
            width: 100%;
          "
        >
          <span style="font-size: 14px">
            {{ data.title ? data.title : "这是一条测试内容" }}
          </span>
          <el-icon @click="onDeleteClick" color="#d9d9d9"><Close /></el-icon>
        </div>
      </div>
    </template>
    <div
      style="
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
      "
    >
      <el-image
        :src="data.thumbnail ? getPath(data.thumbnail) : defaultImg"
        fit="cover"
        style="padding: 5px 5px 0px 5px"
      />
      <div class="body">
        <div class="version">
          版本：{{ data.version ? data.version : "无" }}
        </div>
      </div>
      <div class="actions">
        <el-button
          size="small"
          circle
          color="#626aef"
          :icon="Edit"
          @click="onEditClick"
        />
        <el-button
          size="small"
          circle
          color="#bacf65"
          :icon="ChromeFilled"
          @click="onJumpUrlClick"
        />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Edit, ChromeFilled } from "@element-plus/icons-vue";
import { toRefs } from "vue";
import defaultImg from "@/assets/images/default.webp";
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";
import { getImgPath } from "@/utils/utils";

const pageStore = usePageStore();
const { indexPort } = storeToRefs(pageStore);

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

const getPath = (path) => {
  const fileData = path.split(".");
  const t = getImgPath(fileData[0], fileData[1]);
  return t;
};

// 修改信息
const onEditClick = () => {
  emits("edit", props.data);
};

// 删除
const onDeleteClick = () => {
  emits("delete", props.data);
};

const onJumpUrlClick = () => {
  let ip = window.location.host.split(":")[0];
  console.log("indexPort", indexPort.value);
  let url = `http://${ip}:${indexPort.value.port}/${props.data.name}/`;
  if (props.data.useVersionRoute === 1) {
    url = `http://${ip}:${indexPort.value.port}/${props.data.name}/${props.data.version}/`;
  }
  window.open(url, "_blank");
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

  ::v-deep(.el-card__header) {
    padding: 8px 4px;
  }

  .el-image {
    height: 140px;
    object-fit: none;
  }

  .body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 8px 4px;

    .version {
      font-size: 14px;
      color: #bcbcbc;
    }
  }

  .actions {
    border-top: 1px solid #f0f2f5;
    display: flex;
    justify-content: flex-end;
    height: 24px;
    padding: 8px 4px;
  }
}

::v-deep(.el-card__body) {
  padding: 0px;
  height: calc(100% - 35px);
}
</style>