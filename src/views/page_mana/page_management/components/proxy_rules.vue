<template>
  <el-form inline>
    <el-form-item label="检索">
      <el-input
        v-model="form.condition"
        placeholder="请输入检索内容"
        clearable
        @change="onChange"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onQryClick">查询</el-button>
      <el-button type="primary" @click="onAddClick">添加</el-button>
    </el-form-item>
  </el-form>

  <div class="table-box" ref="element">
    <vxe-table
      border="none"
      :data="tableData"
      size="small"
      :height="tableHeight"
      stripe
      auto-resize
      :row-config="{ isCurrent: true, isHover: true }"
    >
      <vxe-column field="port" title="匹配路由" width="150" align="left" />
      <vxe-column field="port" title="目标路由" width="150" align="left" />
      <vxe-column field="port" title="请求方法" width="150" align="left" />
      <vxe-column field="port" title="目标地址" width="150" align="left" />
      <vxe-column field="port" title="匹配模式" width="150" align="left" />
      <vxe-column field="mark" title="备注" show-overflow min-width="150" />
      <vxe-column
        field="state"
        title="状态"
        width="70"
        align="center"
        fixed="right"
      >
        <template v-slot="{ row }">
          <el-tag effect="plain" :type="row.state ? 'success' : 'danger'">
            {{ row.state ? "启用" : "停用" }}
          </el-tag>
        </template>
      </vxe-column>
      <vxe-column title="操作" width="140" align="center" fixed="right">
        <template v-slot="{ row }">
          <el-button type="primary" link size="small" @click="onEditClick(row)"
            >编辑</el-button
          >
          <el-button type="danger" link size="small" @click="onDeleteClick(row)"
            >删除</el-button
          >
        </template>
      </vxe-column>
    </vxe-table>
  </div>
  <div style="margin-top: 10px">
    <el-pagination
      small
      background
      :current-page="pageNum"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>

  <BsDialog
    :title="title"
    :width="500"
    :visible="visible"
    @close="onClose"
    @save="onSave"
  >
    <template #body>
      <el-form
        label-width="auto"
        :model="dataForm"
        :rules="rules"
        ref="dataFormRef"
      >
        <el-form-item label="端口号" prop="port">
          <el-input-number
            v-model="dataForm.port"
            placeholder="请输入端口号"
            clearable
            style="width: auto"
            :disabled="operationType == 1"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="dataForm.mark"
            placeholder="请输入备注"
            :disabled="dataForm.sys === 1 && operationType === 1"
            type="textarea"
            :row="2"
            clearable
          />
        </el-form-item>
      </el-form>
    </template>
  </BsDialog>
</template>
        
        <script setup>
import { onMounted, reactive, ref } from "vue";

import {
  apiRuleList,
  apiRuleCreate,
  apiRuleModify,
  apiRuleModifyState,
  apiRuleDelete,
} from "@/apis/page/rule";
import { ElMessage, ElMessageBox } from "element-plus";

const nameTitle = "反向代理规则";
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
  port: [{ required: true, message: "请输入匹配路由", trigger: "blur" }],
});
// 分页
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 查询表单
const form = reactive({
  condition: "",
});

// 弹窗表单
const dataForm = reactive({
  port: 0,
  mark: "",
});

//  表格数据
const tableData = ref([]);

// 组件加载完成
onMounted(() => {
  getData();

  tableHeight.value = element.value.offsetHeight;
});

// 获取数据
const getData = async () => {
  let sendData = {
    condition: form.condition,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  };

  let res = await apiRuleList(sendData);
  if (res.code === 200) {
    tableData.value = res.data;
    total.value = res.pageInfo.total;
  }
};

// 重置表单数据
const resetForm = () => {
  dataForm.port = 0;
  dataForm.mark = "";
};

// 赋值表单数据
const setForm = (value) => {
  console.log("value", value);
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

const onSizeChange = (value) => {
  pageSize.value = value;
  getData();
};

const beforeHandleCommand = (command, row) => {
  return {
    command: command,
    row: row,
  };
};

const onCommand = async (command) => {
  switch (command.command) {
    case "state": {
      const res = await apiRuleModifyState(command.row.id);
      if (res.code === 200) {
        ElMessage.success(res.message);
        getData();
      } else {
        ElMessage.error(res.message);
      }
      break;
    }
    case "start": {
      const res = await apiRuleStart(command.row.id);
      if (res.code === 200) {
        ElMessage.success(res.message);
        getData();
      } else {
        ElMessage.error(res.message);
      }
      break;
    }
    case "stop": {
      const res = await apiRuleStop(command.row.id);
      if (res.code === 200) {
        ElMessage.success(res.message);
        getData();
      } else {
        ElMessage.error(res.message);
      }
      break;
    }
    case "restart": {
      const res = await apiRuleReload(command.row.id);
      if (res.code === 200) {
        ElMessage.success(res.message);
        getData();
      } else {
        ElMessage.error(res.message);
      }
      break;
    }
  }
};

const onCurrentChange = () => {
  getData();
};

const onChange = () => {
  getData();
};

const onQryClick = () => {
  getData();
};

const onEditClick = (value) => {
  operationType.value = 1;
  title.value = `[编辑]${nameTitle}`;
  setForm(value);
  visible.value = true;
};

const onEditStateClick = async (value) => {
  const res = await apiRuleModifyState(value.id);
  if (res.code !== 200) {
    ElMessage.error(res.message);
    return;
  }

  ElMessage.success(res.message);
  getData();
};

const onDeleteClick = (value) => {
  ElMessageBox.confirm("请确认是否要删除数据？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await apiRuleDelete(value.id);
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
          const res = await apiRuleCreate(dataForm);
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
          const res = await apiRuleModify(dataForm);
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
  height: calc(100% - 85px);

  ::v-deep .vxe-table--border {
    border: none;
  }

  .more-btn {
    margin-left: 12px;
    position: relative;
    top: 6px;
    color: var(--el-color-primary);
  }
}

.el-dropdown-link:focus {
  outline: none;
}
</style>
        