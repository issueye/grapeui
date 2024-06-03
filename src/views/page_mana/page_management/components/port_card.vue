<template>
  <el-card :style="{ border: indexPort.port == data.port ? '1px solid #398BFE': none }" @click="onClick">
    <div style="
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      ">
      <div style="display: inline-flex; align-items: center">
        <el-tooltip effect="dark" :content="data.mark" placement="top" v-if="data.mark">
          <el-badge is-dot :type="data.state ? 'success' : 'danger'">
            <el-avatar shape="square" size="100">
              <span style="font-size: 18px">{{ data.port }}</span>
            </el-avatar>
            <!-- <span style="font-size: 22px">{{ data.port }}</span> -->
          </el-badge>
        </el-tooltip>
        <el-badge v-else is-dot :type="data.state ? 'success' : 'danger'">
          <el-avatar shape="square" size="100">
            <span style="font-size: 18px">{{ data.port }}</span>
          </el-avatar>
          <!-- <span style="font-size: 22px">{{ data.port }}</span> -->
        </el-badge>


        <!-- <el-divider direction="vertical" v-if="data.mark" />
        <span style="font-size: 12px; color: #bcbcbc">{{ data.mark }}</span> -->
      </div>
      <div style="display: inline-flex">
        <el-button size="small" circle color="#1661ab" :icon="Refresh" @click="onReloadClick" />
        <el-button size="small" circle color="#b7ae8f" :icon="SwitchButton" @click="onStopClick" />

        <el-dropdown style="margin-left: 12px" @command="dropdownClick">
          <el-button size="small" circle color="#ee4866" :icon="More" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="修改">修改</el-dropdown-item>
              <el-dropdown-item command="删除">删除</el-dropdown-item>
              <el-dropdown-item :command="data.useGzip === 1 ? '关闭gzip': '开启gzip'"> {{ data.useGzip === 1 ? '关闭gzip': '开启gzip' }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { toRefs } from "vue";
import { Edit, Refresh, More, SwitchButton } from "@element-plus/icons-vue";
import { usePageStore } from '@/store/page';
import { storeToRefs } from "pinia";

const props = defineProps({
  data: {
    id: "",
    port: 0,
    useGzip: 0,
    state: false,
    mark: "",
  },
});

const emits = defineEmits(['onClick', 'onEditClick', 'onDelClick', 'onStopClick', 'onReloadClick'])

const { data } = toRefs(props);

const pageStore = usePageStore();
const { indexPort } = storeToRefs(pageStore)


const onClick = () => {
  emits('onClick', data)
}

const onStopClick = () => {
  emits('onStopClick', data)
}

const onReloadClick = () => {
  emits('onReloadClick', data)
}

const dropdownClick = (value) => {
  switch (value) {
    case '修改':
      {
        emits('onEditClick', data)
        break
      }
    case '删除':
      {
        emits('onDelClick', data)
        break
      }
  }
}
</script>


<style lang="scss" scoped>
.el-card:hover {
  box-shadow: 0 1px 6px rgba(255, 255, 255, 0.932);
  border-color: #eee;
  transition: all 0.2s ease-in-out;
}

::v-deep(.el-card__body) {
  padding: 8px;
  height: calc(100% - 35px);
}

::v-deep(.el-avatar) {
  height: 30px;
  width: 60px;
}
</style>