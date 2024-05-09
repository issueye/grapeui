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
    </el-form-item>
  </el-form>

  <div class="table-box">
    <el-scrollbar :height="250">
      <div class="table-items">
        <div v-for="(item, index) in tableData" :key="index">
          <el-image
            style="width: 100px; height: 100px; margin: 2px"
            :src="`/resources/${item.fileName}${item.ext}`"
            fit="cover"
          />
          <div>{{ item.title }}</div>
        </div>
      </div>
    </el-scrollbar>
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
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { apiResourceList } from "@/apis/page/resource";

// 分页
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 查询表单
const form = reactive({
  condition: "",
});

//  表格数据
const tableData = ref([]);

onMounted(() => {
  getData();
});

const getData = async () => {
  let sendData = {
    condition: form.condition,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  };

  let res = await apiResourceList(sendData);
  if (res.code === 200) {
    tableData.value = res.data;
    total.value = res.pageInfo.total;
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  height: 300px;

  .table-items {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
}
</style>