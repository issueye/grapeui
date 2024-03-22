<template>
  <el-dialog
    v-model="props.visible"
    :title="props.title"
    :width="props.width"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <dir class="dialog-body-box">
      <slot name="body"> </slot>
    </dir>
    <div class="dialog-footer-box">
      <slot name="footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="handleClose">关闭</el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  width: 500,
});

const emits = defineEmits(["close"]);

const handleClose = () => {
  emits("close");
};

const submitForm = () => {};
</script>

<style lang="scss" scoped>
.dialog-footer-box {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-body-box {
  padding: 20px;
}
</style>
