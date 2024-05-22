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
    <vxe-table round border :data="tableData" size="mini" :height="tableHeight" stripe auto-resize
      :row-config="{ isCurrent: true, isHover: true }">
      <vxe-column field="name" title="匹配路由" min-width="150" align="left" show-overflow />
      <vxe-column field="targetRoute" title="目标路由" min-width="150" align="left" show-overflow />
      <vxe-column field="method" title="请求方法" width="80" align="left" show-overflow />
      <vxe-column field="target" title="目标地址" width="150" align="left" show-overflow />
      <vxe-column field="matchType" title="匹配模式" width="80" align="left" show-overflow>
        <template v-slot="{ row }">
          <el-tag effect="plain" :type="row.matchType == 1 ? 'primary' : 'success'"> {{ row.matchType == 1 ? 'GIN': 'MUX' }}</el-tag>
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

  <BsDialog :title="title" :width="700" :visible.sync="visible" @close="onClose" @save="onSave" @open="onOpen">
    <template #body>
      <el-form label-width="auto" :model="dataForm" :rules="rules" ref="dataFormRef">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="匹配路由" prop="name">
              <el-input v-model="dataForm.name" placeholder="请输入匹配路由" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标路由" prop="targetRoute">
              <el-input v-model="dataForm.targetRoute" placeholder="请输入目标路由" clearable />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="目标地址" prop="target">
              <!-- <el-input v-model="dataForm.target" placeholder="请输入目标地址" clearable /> -->
              <el-select v-model="dataForm.targetId" placeholder="请选择目标地址" clearable>
                <el-option v-for="(item, index) in targetTableData" :key="index" :label="item.mark" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求方法" prop="method">
              <el-select v-model="dataForm.method" placeholder="请选择请求方法" clearable>
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
                <el-option label="PUT" value="PUT" />
                <el-option label="PATCH" value="PATCH" />
                <el-option label="DELETE" value="DELETE" />
                <el-option label="Any" value="Any" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="匹配模式" prop="matchType">
              <el-select v-model="dataForm.matchType" placeholder="请输入匹配模式" clearable>
                <el-option label="GIN" :value="1" />
                <el-option label="MUX" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注">
          <el-input v-model="dataForm.mark" placeholder="请输入备注" :disabled="dataForm.sys === 1 && operationType === 1"
            type="textarea" :row="2" clearable />
        </el-form-item>
      </el-form>
    </template>
  </BsDialog>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { usePageStore } from '@/store/page';
import { storeToRefs } from "pinia";

const pageStore = usePageStore();
const { indexPort, ruleTableData: tableData, ruleTotal: total } = storeToRefs(pageStore)

import {
  apiRuleCreate,
  apiRuleModify,
  apiRuleDelete,
} from "@/apis/page/rule";
import {
  apiTargetList
} from '@/apis/page/target';

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
  name: [{ required: true, message: "请输入匹配路由", trigger: "blur" }],
  method: [{ required: true, message: "请选择请求方法", trigger: "blur" }],
  targetRoute: [{ required: true, message: "请输入目标路由", trigger: "blur" }],
  targetId: [{ required: true, message: "请选择目标地址", trigger: "blur" }],
  matchType: [{ required: true, message: "请选择匹配模式", trigger: "blur" }],
});
// 分页
const pageNum = ref(1);
const pageSize = ref(10);

// 查询表单
const form = reactive({
  condition: "",
});

// 弹窗表单
const dataForm = reactive({
  id: '',
  portId: '',
  name: '',
  targetRoute: '',
  method: '',
  targetId: '',
  matchType: '',
  mark: '',
});

//  表格数据
const targetTableData = ref([]);

// 组件加载完成
onMounted(() => {
  getData();
  getTargetData();
  tableHeight.value = element.value.offsetHeight;
});

const getTargetData = async () => {
  const res = await apiTargetList();
  console.log('getTargetData -> data', res);
  if (res.code === 200) {
    targetTableData.value = res.data;
    console.log('targetTableData', targetTableData.value);
  }
}

// 获取数据
const getData = async () => {
  let sendData = {
    condition: form.condition,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  };

  pageStore.getRuleData(sendData);
};

// 重置表单数据
const resetForm = () => {
  dataForm.id = "";
  dataForm.portId = "";
  dataForm.name = "";
  dataForm.targetRoute = "";
  dataForm.method = "";
  dataForm.targetId = "";
  dataForm.matchType = "";
  dataForm.mark = "";
};

// 赋值表单数据
const setForm = (value) => {
  console.log("value", value);
  
  dataForm.id =  value.id;
  dataForm.portId =  value.portId;
  dataForm.name =  value.name;
  dataForm.targetRoute =  value.targetRoute;
  dataForm.method =  value.method;
  dataForm.targetId =  value.targetId;
  dataForm.matchType =  value.matchType;
  dataForm.mark =  value.mark;
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
          dataForm.portId = indexPort.value.id;
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

const onOpen = () => {
  getTargetData();
}

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