<template>
  <div style="display: inline-flex;justify-content: space-between; width: 100%;">
    <el-input v-model="form.condition" placeholder="请输入检索内容" clearable @change="onChange" style="width: 200px;" />
    <div style="display: inline-flex; margin-left: 5px">
      <el-button type="primary" @click="onAddClick">添加</el-button>
      <el-button type="primary" @click="onFreshSTClick">刷新统计</el-button>
    </div>
  </div>

  <div class="table-box" ref="element">
    <PortCard :data="item" :key="index" style="margin: 16px 0px" v-for="(item, index) in tableData"
      @on-click="onRowClick" @on-edit-click="onEditClick" @on-stop-click="onStopClick" @on-reload-click="onReloadClick" />
  </div>
  <div style="margin-top: 10px">
    <el-pagination small background :current-page="pageNum" :page-size="pageSize" :page-sizes="[5, 10, 20]"
      :total="total" layout="total, sizes, prev, pager, next" @size-change="onSizeChange"
      @current-change="onCurrentChange" />
  </div>

  <BsDialog :title="title" :width="500" :visible="visible" @close="onClose" @save="onSave">
    <template #body>
      <el-form label-width="auto" :model="dataForm" :rules="rules" ref="dataFormRef">
        <el-form-item label="端口号" prop="port">
          <el-input-number v-model="dataForm.port" placeholder="请输入端口号" clearable style="width: 100%"
            :disabled="operationType == 1" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="dataForm.mark" placeholder="请输入备注" :disabled="dataForm.sys === 1 && operationType === 1"
            type="textarea" :row="2" clearable />
        </el-form-item>
      </el-form>
    </template>
  </BsDialog>
</template>

<script setup>
import PortCard from "./port_card.vue";
import { onMounted, reactive, ref } from "vue";

import {
  apiPortList,
  apiPortCreate,
  apiPortModify,
  apiPortModifyState,
  apiPortDelete,
  apiPortStop,
  apiPortReload,
  apiPortRefreshStatistics,
} from "@/apis/page/port";
import { ElMessage, ElMessageBox } from "element-plus";
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";

const pageStore = usePageStore();
const { tableData, total, pageNum, pageSize, form } = storeToRefs(pageStore);

const nameTitle = "端口号";
// 标题
const title = ref("");
const tableHeight = ref(null);
const element = ref();
// 显示弹窗
const visible = ref(false);
// 操作类型
const operationType = ref(0);
// 数据表单
const dataFormRef = ref();
// 表单验证规则
const rules = reactive({
  port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
});

// 弹窗表单
const dataForm = reactive({
  port: 0,
  mark: "",
});

//  表格数据
const tableRef = ref(null);

// 组件加载完成
onMounted(() => {
  getData();

  tableHeight.value = document.documentElement.clientHeight - 240;
});

// 获取数据
const getData = async () => {
  pageStore.getData();
};

// 重置表单数据
const resetForm = () => {
  dataForm.port = 0;
  dataForm.mark = "";
};

// 赋值表单数据
const setForm = (value) => {
  // console.log("value", value);
  dataForm.port = value.port;
  dataForm.mark = value.mark;
};

/**
 * 添加事件
 */
const onAddClick = () => {
  operationType.value = 0;
  title.value = `[添加]${nameTitle}`;
  resetForm();
  visible.value = true;
};

const onFreshSTClick = async () => {
  await apiPortRefreshStatistics();
  getData();
}

const onRowClick = (data) => {
  pageStore.setIndexPort(data.value);
};

const onSizeChange = (value) => {
  pageSize.value = value;
  getData();
};

const onStopClick = async (data) => {
  const res = await apiPortStop(data.value.id);
  if (res.code === 200) {
    ElMessage.success(res.message);
    getData();
  } else {
    ElMessage.error(res.message);
  }
}

const onReloadClick = async (data) => {
  const res = await apiPortReload(data.value.id);
      if (res.code === 200) {
        ElMessage.success(res.message);
        getData();
      } else {
        ElMessage.error(res.message);
      }
}

const onCurrentChange = () => {
  getData();
};

const onChange = () => {
  getData();
};

const onQryClick = () => {
  getData();
};

const onEditClick = (data) => {
  operationType.value = 1;
  title.value = `[编辑]${nameTitle}`;
  setForm(data.value);
  visible.value = true;
};

const onEditStateClick = async (value) => {
  const res = await apiPortModifyState(value.id);
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }

  ElMessage.success(res.message);
  getData();
};

const onDeleteClick = (data) => {
  ElMessageBox.confirm("请确认是否要删除数据？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await apiPortDelete(data.value.id);
      if (res.code !== 200) {
        ElMessage.error(res.message);
        return;
      }

      ElMessage.success("删除成功");
      getData();
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
};

const onSave = () => {
  if (!dataFormRef.value) return;
  dataFormRef.value.validate(async (valid) => {
    if (valid) {
      switch (operationType.value) {
        case 0: {
          const res = await apiPortCreate(dataForm);
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }

          ElMessage.success(res.message);
          visible.value = false;
          getData();
          break;
        }

        case 1: {
          const res = await apiPortModify(dataForm);
          if (res.code !== 200) {
            ElMessage.error(res.message);
            return;
          }

          ElMessage.success(res.message);
          visible.value = false;
          getData();
          break;
        }
      }
    } else {
      console.log("表单验证失败");
    }
  });
};

const onClose = () => {
  visible.value = false;

  if (!dataFormRef.value) return;
  dataFormRef.value.resetFields();
};
</script>

<style lang="scss" scoped>
.table-box {
  height: calc(100% - 87px);

  ::deep .vxe-table--border {
    border: none;
  }

  .more-btn {
    margin-left: 12px;
    position: relative;
    color: var(--el-color-primary);
  }
}

.el-dropdown-link:focus {
  outline: none;
}

.el-dropdown {
  vertical-align: middle;
}
</style>