<template>
  <el-card>
    <div
      style="
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      "
    >
      <div style="display: inline-flex; align-items: center">
        <el-badge is-dot class="item">
          <el-avatar shape="square" size="100">
            <span style="font-size: 18px">{{ data.port }}</span>
          </el-avatar>
          <!-- <span style="font-size: 22px">{{ data.port }}</span> -->
        </el-badge>

        <el-divider direction="vertical" v-if="data.mark" />
        <span style="font-size: 12px; color: #bcbcbc">{{ data.mark }}</span>
      </div>
      <div style="display: inline-flex">
        <el-button
          size="small"
          circle
          color="#626aef"
          :icon="SwitchButton"
          @click="onEditClick"
        />
        <el-button
          size="small"
          circle
          color="#1661ab"
          :icon="Refresh"
          @click="onEditClick"
        />

        <el-dropdown style="margin-left: 12px">
          <el-button
            size="small"
            circle
            color="#ee4866"
            :icon="More"
            @click="onEditClick"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
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

const props = defineProps({
  data: {
    id: "",
    port: 0,
    mark: "",
  },
});

const { data } = toRefs(props);

const onEditClick = () => {};
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