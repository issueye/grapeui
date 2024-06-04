<template>
  <el-form inline>
    <el-form-item label="检索">
      <el-input v-model="form.condition" placeholder="请输入检索内容" clearable @change="onChange" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onQryClick">查询</el-button>
      <el-button type="primary" @click="onAddClick">添加</el-button>
    </el-form-item>
  </el-form>

  <div class="table-box" ref="element">
    <vxe-table round border :data="tableData" size="mini" :height="tableHeight" stripe auto-resize empty-text="没有数据"
      :row-config="{ isCurrent: true, isHover: true }">
      <vxe-column field="matchContent" title="匹配内容" width="300" align="left" show-overflow />
      <vxe-column field="matchType" title="匹配类型" width="150" align="left" show-overflow>
      <template v-slot="{ row }">
        {{ getType(row) }}
      </template>
      </vxe-column>
      <vxe-column field="mark" title="备注" min-width="150" show-overflow />
      <vxe-column title="操作" width="140" align="center" fixed="right">
        <template v-slot="{ row }">
          <el-button type="primary" link size="small" @click="onEditClick(row)">编辑</el-button>
          <el-button type="danger" link size="small" @click="onDeleteClick(row)">删除</el-button>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
  <div style="margin-top: 10px">
    <el-pagination small background :current-page="pageNum" :page-size="pageSize" :page-sizes="[5, 10, 20]"
      :total="total" layout="total, sizes, prev, pager, next" @size-change="onSizeChange"
      @current-change="onCurrentChange" />
  </div>

  <BsDialog :title="title" :width="500" v-model:visible="visible" @close="onClose" @save="onSave" @open="onOpen">
    <template #body>
      <el-form label-width="auto" :model="dataForm" :rules="rules" ref="dataFormRef">
        <el-form-item label="匹配模式" prop="matchType">
          <el-select v-model="dataForm.matchType" placeholder="请输入匹配模式" clearable>
            <el-option label="URL路由" :value="1" />
            <el-option label="文件后缀" :value="2" />
            <el-option label="正则表达式" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="匹配内容" prop="matchContent">
          <el-input v-model="dataForm.matchContent" placeholder="请输入匹配内容" clearable />
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="dataForm.mark" placeholder="请输入备注" type="textarea" :row="2" clearable />
        </el-form-item>
      </el-form>
    </template>
  </BsDialog>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";

const pageStore = usePageStore();
const {
  indexPort,
  gzipFilterTableData: tableData,
  ruleTotal: total,
} = storeToRefs(pageStore);

import { apiGzipFilterCreate, apiGzipFilterModify, apiGzipFilterDelete } from "@/apis/page/gzip_filter";

import { ElMessage, ElMessageBox } from "element-plus";

const nameTitle = "gzip过滤规则";
// // 标题
const title = ref("");
const tableHeight = ref(null);
const element = ref();
// 显示弹窗
const visible = ref(false);
// 操作类型
const operationType = ref(0);
// 数据表单
const dataFormRef = ref();
// // 表单验证规则
// const rules = reactive({
//   matchContent: [{ required: true, message: "请输入匹配内容", trigger: "blur" }],
//   matchType: [{ required: true, message: "请选择匹配模式", trigger: "blur" }],
// });
// 分页
const pageNum = ref(1);
const pageSize = ref(10);

// 查询表单
const form = reactive({
  condition: "",
});

// 弹窗表单
const dataForm = reactive({
  id: "",
  portId: "",
  matchContent: "",
  matchType: 1,
  mark: "",
});

// 组件加载完成
onMounted(() => {
  // getData();
  // tableHeight.value = element.value.offsetHeight;
});

const getType = (data) => {
  switch (data.matchType) {
    case 1:
      return 'URL路由'
    case 2:
      return '文件后缀'
    case 3:
      return '正则表达式'
    default:
      return ''
  }
}

// 获取数据
const getData = async () => {
  let sendData = {
    condition: form.condition,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    portId: indexPort.value.id,
  };

  pageStore.getGzipFilterData(sendData);
};

// 重置表单数据
const resetForm = () => {
  dataForm.id = "";
  dataForm.portId = indexPort.value.portId;
  dataForm.matchContent = "";
  dataForm.matchType = 1;
  dataForm.mark = "";
};

// 赋值表单数据
const setForm = (value) => {
  dataForm.id = value.id;
  dataForm.portId = indexPort.value.portId;
  dataForm.matchContent = value.matchContent;
  dataForm.matchType = value.matchType;
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

const onDeleteClick = (value) => {
  ElMessageBox.confirm("请确认是否要删除数据？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await apiGzipFilterDelete(value.id);
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
          console.log('indexPort.value', indexPort.value);
          dataForm.portId = indexPort.value.id;
          console.log('dataForm', dataForm);
          const res = await apiGzipFilterCreate(dataForm);
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
          const res = await apiGzipFilterModify(dataForm);
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

// const onOpen = () => {
// };
</script>

<style lang="scss" scoped>
.table-box {
  height: calc(100% - 85px);

  ::v-deep(.vxe-table--border) {
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