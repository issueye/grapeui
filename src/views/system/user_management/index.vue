<template>
  <BsHeader title="用户管理" description="用户管理">
    <template #actions>
      <el-button type="primary" @click="onAddClick">添加</el-button>
    </template>
  </BsHeader>
  <BsMain>
    <template #body>
      <el-form inline>
        <el-form-item label="检索">
          <el-input
            v-model="form.condition"
            placeholder="请输入检索内容"
            size="normal"
            clearable
            @change="onChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQryClick">查询</el-button>
        </el-form-item>
      </el-form>

      <div>
        <vxe-table
          round
          border
          :data="tableData"
          size="small"
          :height="tableHeight"
          stripe
          auto-resize
        >
          <vxe-column field="id" title="编码" />
          <vxe-column field="account" title="账户" />
          <vxe-column field="name" title="姓名" />
          <vxe-column field="groupName" title="用户组" />
          <vxe-column title="操作" width="130" align="center">
            <el-button type="primary" text size="small" @click="onEditClick"
              >编辑</el-button
            >
            <el-button type="danger" text size="small" @click="onEditClick"
              >删除</el-button
            >
          </vxe-column>
        </vxe-table>

        <div style="margin-top: 10px">
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="50"
            class="mt-4"
          />
        </div>
      </div>
    </template>
  </BsMain>

  <BsDialog
    :title="title"
    :width="500"
    :visible="visible"
    @close="onDialogClose"
  >
    <template #body>
      <el-form label-width="70px">
        <el-form-item label="账户">
          <el-input
            v-model="dataForm.account"
            placeholder="请输入账户"
            size="normal"
            clearable
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="dataForm.name"
            placeholder="请输入账户"
            size="normal"
            clearable
          />
        </el-form-item>
        <el-form-item label="用户组">
          <el-select
            v-model="dataForm.groupId"
            value-key=""
            placeholder=""
            clearable
            filterable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
  </BsDialog>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";

const form = reactive({
  condition: "",
});

const dataForm = reactive({
  account: "",
  name: "",
  groupId: "",
});

const title = ref("用户信息");

const options = ref([
  { value: "10001", label: "管理员" },
  { value: "10000", label: "测试" },
]);

const ruleForm = reactive({
  pass: "",
  checkPass: "",
  age: "",
});

onMounted(() => {
  tableHeight.value = document.documentElement.clientHeight - 286;
});

const tableHeight = ref();
const visible = ref(false);

const tableData = ref([
  {
    id: "1000",
    name: "管理员",
    account: "admin",
    groupName: "管理员",
  },
  {
    id: "1001",
    name: "测试",
    account: "test",
    groupName: "测试组",
  },
]);

const onAddClick = () => {
  visible.value = true;
};

const onChange = () => {};

const onQryClick = () => {};

const onEditClick = () => {
  visible.value = true;
};

const onDialogClose = () => {
  visible.value = false;
};
</script>

<style lang="scss">
.dialog-footer-box {
  display: flex;
  justify-content: flex-end;
}
</style>
