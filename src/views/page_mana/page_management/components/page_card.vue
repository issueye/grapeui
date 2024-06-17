<template>
  <el-card
    @click="onCardClick"
    :style="{
      border:
        data.id == indexPageId ? '1px solid #398BFE' : '1px solid #d9d9d9',
    }"
  >
    <template #header>
      <div class="card-header">
        <div class="flex justify-between w-full">
          <span class="text-sm">
            {{ data.title ? data.title : "这是一条测试内容" }}
          </span>
          <el-icon @click="onDeleteClick" color="#d9d9d9"><Close /></el-icon>
        </div>
      </div>
    </template>
    <div class="flex flex-col justify-between h-full">
      <el-image
        :src="data.thumbnail ? getPath(data.thumbnail) : defaultImg"
        fit="cover"
        style="padding: 5px 5px 0px 5px"
      />
      <div class="flex flex-col justify-around px-2 py-1">
        <div class="text-sm text-slate-300">
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
import { ref, toRefs } from "vue";
import defaultImg from "@/assets/images/default.webp";
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";
import { getImgPath } from "@/utils/utils";

const pageStore = usePageStore();
const { indexPort, indexPageId } = storeToRefs(pageStore);

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

const onCardClick = () => {
  indexPageId.value = props.data.id;
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