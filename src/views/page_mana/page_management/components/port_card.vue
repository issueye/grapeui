<template>
  <el-card
    :style="{
      border: indexPort.port == data.port ? '1px solid #398BFE' : 'none',
    }"
    @click="onClick"
  >
    <div
      style="
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      "
    >
      <div style="display: inline-flex; align-items: flex-start; padding: 5px">
        <el-tooltip
          effect="dark"
          :content="data.mark"
          placement="top"
          v-if="data.mark"
        >
          <el-badge is-dot :type="data.state ? 'success' : 'danger'">
            <el-avatar shape="square" :size="100">
              <span style="font-size: 18px">{{ data.port }}</span>
            </el-avatar>
          </el-badge>
        </el-tooltip>
        <el-badge v-else is-dot :type="data.state ? 'success' : 'danger'">
          <el-avatar shape="square" :size="100">
            <span style="font-size: 18px">{{ data.port }}</span>
          </el-avatar>
        </el-badge>

        <el-tag
          type="primary"
          effect="plain"
          round
          style="margin-left: 5px"
          v-if="data.useGzip"
          size="small"
        >
          gzip
        </el-tag>
      </div>
      <div style="display: inline-flex">
        <el-tooltip effect="dark" content="刷新重启" placement="bottom">
          <el-button
            size="small"
            circle
            color="#1661ab"
            :icon="Refresh"
            @click="onReloadClick"
          />
        </el-tooltip>

        <el-tooltip effect="dark" content="停止监听端口" placement="bottom">
          <el-button
            size="small"
            circle
            color="#b7ae8f"
            :icon="SwitchButton"
            @click="onStopClick"
          />
        </el-tooltip>

        <el-dropdown style="margin-left: 12px" @command="dropdownClick">
          <el-button size="small" circle color="#ee4866" :icon="More" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="edit">修改</el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
              <el-dropdown-item command="gzip">
                {{ data.useGzip ? "关闭gzip" : "开启gzip" }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <template #footer>
      <div style="display: inline-flex">
        <div class="item" style="margin-left: 10px">
          <el-tooltip
            effect="dark"
            :content="`页面${data.pageCount}个`"
            placement="bottom"
          >
            <SvgIcon iconName="page" />
          </el-tooltip>
          <span> {{ data.pageCount }} 个</span>
        </div>
        <el-divider direction="vertical" />
        <div class="item">
          <el-tooltip
            effect="dark"
            :content="`转发规则${data.ruleCount}个`"
            placement="bottom"
          >
            <SvgIcon iconName="rule" />
          </el-tooltip>
          <span> {{ data.ruleCount }} 个</span>
        </div>
        <el-divider direction="vertical" />
        <div class="item">
          <el-tooltip
            effect="dark"
            :content="`gzip过滤${data.gzipFilterCount}条`"
            placement="bottom"
          >
            <SvgIcon iconName="filter" />
          </el-tooltip>
          <span> {{ data.gzipFilterCount }} 条</span>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import { toRefs } from "vue";
import { Edit, Refresh, More, SwitchButton } from "@element-plus/icons-vue";
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

import {
  apiPortDelete,
  apiPortStop,
  apiPortGzip,
  apiPortReload,
} from "@/apis/page/port";

const props = defineProps({
  data: {
    id: "",
    port: 0,
    useGzip: 0,
    state: false,
    mark: "",
    pageCount: 0,
    ruleCount: 0,
    gzipFilterCount: 0,
  },
});

const emits = defineEmits(["onClick", "onEditClick"]);

const { data } = toRefs(props);

const pageStore = usePageStore();
const { indexPort } = storeToRefs(pageStore);

const onClick = () => {
  emits("onClick", data);
};

const onStopClick = async () => {
  const res = await apiPortStop(data.value.id);
  if (res.code === 200) {
    ElMessage.success(res.message);
    pageStore.getData();
  } else {
    ElMessage.error(res.message);
  }
};

const onReloadClick = async () => {
  const res = await apiPortReload(data.value.id);
  if (res.code === 200) {
    ElMessage.success(res.message);
    pageStore.getData();
  } else {
    ElMessage.error(res.message);
  }
};

const dropdownClick = (value) => {
  switch (value) {
    case "edit": {
      emits("onEditClick", data);
      break;
    }
    case "delete": {
      onDelClick();
      break;
    }
    case "gzip": {
      onUseGzipClick();
      break;
    }
  }
};

const onUseGzipClick = async () => {
  console.log("data.value", data.value);
  const res = await apiPortGzip(data.value.id);
  if (res.code === 200) {
    ElMessage.success(res.message);

    pageStore.getData();
  } else {
    ElMessage.error(res.message);
  }
};

const onDelClick = async () => {
  const res = await apiPortDelete(data.value.id);
  if (res.code === 200) {
    ElMessage.success(res.message);
    pageStore.getData();
  } else {
    ElMessage.error(res.message);
  }
};
</script>


<style lang="scss" scoped>
.el-card:hover {
  box-shadow: 0 1px 6px rgba(255, 255, 255, 0.932);
  border-color: #eee;
  transition: all 0.2s ease-in-out;
}

.item {
  display: inline-flex;
  align-items: center;

  span {
    color: #bfbfbf;
    font-size: 11px;
    margin-left: 5px;
  }
}

::v-deep(.el-card__body) {
  padding: 8px;
  height: calc(100% - 35px);
}

::v-deep(.el-card__footer) {
  padding: 4px;
}

::v-deep(.el-avatar) {
  height: 30px;
  width: 60px;
}
</style>