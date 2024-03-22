<template>
  <BsHeader title="用户管理" description="用户管理">
    <template #actions>
      <el-button type="primary">添加</el-button>
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

  <vxe-modal v-model="visible" size="small" show-footer>
    <template #title>
      <span>{{ title }}</span>
    </template>
    <template #default>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="Password" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </template>
  </vxe-modal>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";

const form = reactive({
  condition: "",
});

const dataFrom = reactive({
  account: "",
});

const title = ref('用户信息')

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

const onChange = () => {};

const onQryClick = () => {};

const onEditClick = () => {
  visible.value = true;
};
</script>

<style lang="scss"></style>
