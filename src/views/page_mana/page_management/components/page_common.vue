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
      <el-button type="primary" @click="onUploadClick">上传</el-button>
    </el-form-item>
  </el-form>

  <div class="table-box">
    <el-scrollbar :height="tableHeight">
      <div class="table-items">
        <PageCard
          :data="dataForm"
          v-for="(data, index) in 10"
          :key="index"
          @edit="onEditClick"
          @delete="onDeleteClick"
        />
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

  <BsDialog
    :title="title"
    :width="700"
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="dataForm.title"
                placeholder="请输入页面标题"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本" prop="version">
              <el-input
                v-model="dataForm.version"
                placeholder="请输入版本"
                :disabled="operationType === 1"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col>
            <el-form-item label="名称" prop="name">
              <div class="item">
                <el-input
                  v-model="dataForm.name"
                  placeholder="请输入页面名称"
                  clearable
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>

        <el-form-item label="备注">
          <el-input
            v-model="dataForm.mark"
            placeholder="请输入备注"
            type="textarea"
            :row="5"
            clearable
          />
        </el-form-item>

        <el-form-item label="简略图">
          <div :style="{ display: 'flex' }">
            <el-image
              style="width: 100px; height: 100px"
              :src="
                dataForm.thumbnail ? getPath(dataForm.thumbnail) : defaultImage
              "
              fit="cover"
            />
            <el-popover
              placement="right"
              :visible="resourceVisible"
              :width="700"
              trigger="click"
            >
              <template #reference>
                <el-button
                  style="margin-left: 10px"
                  type="primary"
                  @click="onQryClick"
                  >选择资源</el-button
                >
              </template>
              <BsResources @onSelect="onSelect" />
            </el-popover>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </BsDialog>

  <BsDialog
    title="页面上传"
    :width="500"
    :visible="uploadVisible"
    @close="onUploadClose"
    @save="onUploadSave"
  >
    <template #body>
      <div style="padding: 24px">
        <el-upload
          drag
          :http-request="onUpload"
          action=""
          multiple
          :on-progress="onProgress"
          :show-file-list="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            移动文件到这里或者 <em>点击上传</em>
          </div>
        </el-upload>
      </div>
      <div>
        <div style="margin: 10px 0 10px 0">准备上传页面文件</div>
        <el-progress :percentage="50" :stroke-width="15" striped />
      </div>
    </template>
  </BsDialog>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import PageCard from "./page_card.vue";
import { getImgPath } from "@/utils/utils";
import defaultImage from "@/assets/images/default.png";

import {
  apiPageList,
  apiPageCreate,
  apiPageModify,
  apiPageModifyState,
  apiPageDelete,
} from "@/apis/page/page";
import { ElMessage, ElMessageBox } from "element-plus";

const nameTitle = "页面";
// 标题
const title = ref("");
const tableHeight = ref(null);
// 显示弹窗
const visible = ref(false);
// 显示图片预览
const showImagePreview = ref(false);
// 操作类型
const operationType = ref(0);
// 数据表单
const dataFormRef = ref();
// 表单验证规则
const rules = reactive({
  title: [{ required: true, message: "请输入页面标题", trigger: "blur" }],
  name: [{ required: true, message: "请输入页面名称", trigger: "blur" }],
  version: [{ required: true, message: "请输入页面版本", trigger: "blur" }],
});
// 分页
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);

const resourceVisible = ref(false);

// 查询表单
const form = reactive({
  condition: "",
});

// 弹窗表单
const dataForm = reactive({
  id: "",
  title: "",
  name: "",
  version: "",
  portId: "",
  fileName: "",
  thumbnail: "",
  mark: "",
});

const uploadVisible = ref(false);

const onUpload = () => {};

const fileList = ref([]);

const getPath = (name) => {
  const info = name.split(".");
  return getImgPath(info[0], info[1]);
};

const onSelect = (value) => {
  console.log("value", value);

  resourceVisible.value = false;

  dataForm.thumbnail = value;
};

//  表格数据
const tableData = ref([]);

// 组件加载完成
onMounted(() => {
  getData();

  tableHeight.value = document.documentElement.clientHeight - 276;
});

// 获取数据
const getData = async () => {
  let sendData = {
    condition: form.condition,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  };

  let res = await apiPageList(sendData);
  if (res.code === 200) {
    tableData.value = res.data;
    total.value = res.pageInfo.total;
  }
};

// 重置表单数据
const resetForm = () => {
  dataForm.id = "";
  dataForm.title = "";
  dataForm.name = "";
  dataForm.version = "";
  dataForm.portId = "";
  dataForm.fileName = "";
  dataForm.mark = "";
};

// 赋值表单数据
const setForm = (value) => {
  dataForm.id = value.id;
  dataForm.title = value.title;
  dataForm.name = value.name;
  dataForm.version = value.version;
  dataForm.portId = value.portId;
  dataForm.fileName = value.fileName;
  dataForm.mark = value.mark;
};

const onProgress = (event, file, fileList) => {
  console.log(event, file, fileList);
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

const onUploadClick = () => {
  uploadVisible.value = true;
};
const onUploadClose = () => {
  uploadVisible.value = false;
};
const onUploadSave = () => {};

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
  // getData();
  resourceVisible.value = true;
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
      let res = await apiPageDelete(value.id);
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
          const res = await apiPageCreate(dataForm);
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
          const res = await apiPageModify(dataForm);
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
.table-items {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.item {
  display: flex;
  width: 100%;
}

.table-box {
  height: 100%;
}
</style>