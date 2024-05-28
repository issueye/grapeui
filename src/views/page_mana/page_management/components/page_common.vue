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
      <el-button type="primary" @click="onUploadClick">上传</el-button>
    </el-form-item>
  </el-form>

  <div class="table-box">
    <el-scrollbar :height="tableHeight">
      <div class="table-items">
        <PageCard
          :data="item"
          v-for="(item, index) in tableData"
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
    @open="onOpen"
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
              <el-select
                v-model="dataForm.version"
                placeholder="请输入版本"
                clearable
              >
                <el-option
                  v-for="(item, index) in pageVersionData"
                  :key="index"
                  :value="item.version"
                  :label="item.version"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
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
          <el-col :span="12">
            <el-form-item label="版本路由" prop="useVersionRoute">
              <el-switch
                v-model="dataForm.useVersionRoute"
                inline-prompt
                active-text="启用"
                inactive-text="停用"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
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
                  @click="onSelectResourceClick"
                  >选择资源</el-button
                >
              </template>
              <BsResources
                @onSelect="onSelect"
                @onCancel="resourceVisible = false"
              />
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
    :showFooter="false"
    @open="onUploadOpen"
  >
    <template #body>
      <div
        style="display: flex; justify-content: flex-end; align-items: flex-end"
      >
        <div style="width: 100%; margin-right: 20px">
          <div style="margin: 10px 0 10px 0">{{ uploadMessage }}</div>
          <el-progress
            :percentage="progress"
            :stroke-width="32"
            striped
            striped-flow
            :duration="30"
            :status="progressStatus"
          />
        </div>
        <el-upload
          :http-request="onUpload"
          action=""
          multiple
          :show-file-list="false"
          accept=".zip"
        >
          <template #trigger>
            <el-button type="primary">上传</el-button>
          </template>
        </el-upload>
      </div>
    </template>
  </BsDialog>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import PageCard from "./page_card.vue";
import { getImgPath } from "@/utils/utils";
import defaultImage from "@/assets/images/default.png";
import { nanoid } from "nanoid";

import {
  apiPageCreate,
  apiPageModify,
  apiPageDelete,
  apiPageVersionList,
} from "@/apis/page/page";
import { ElMessage, ElMessageBox } from "element-plus";
import { apiResourceUpload } from "@/apis/page/resource";
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";

const pageStore = usePageStore();
const {
  indexPort,
  pageTableData: tableData,
  pageTotal: total,
} = storeToRefs(pageStore);

const nameTitle = "页面";
// 标题
const title = ref("");
const tableHeight = ref(null);
// 显示弹窗
const visible = ref(false);
const sse = ref(null);
// 操作类型
const operationType = ref(0);
// 数据表单
const dataFormRef = ref();
// 上传文件的提示
const uploadMessage = ref("上传文件");
// progress
const progress = ref(0);
const progressStatus = ref("");
// 表单验证规则
const rules = reactive({
  title: [{ required: true, message: "请输入页面标题", trigger: "blur" }],
  name: [{ required: true, message: "请输入页面名称", trigger: "blur" }],
  version: [{ required: true, message: "请输入页面版本", trigger: "blur" }],
});
// 分页
const pageNum = ref(1);
const pageSize = ref(10);

const resourceVisible = ref(false);

const pageVersionData = ref([]);

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

const listenSSE = (id) => {
  if (sse.value) {
    sse.value.close();
  }

  sse.value = new EventSource("/api/v1/resource/upload/sse");
  console.log("id", id);
  sse.value.addEventListener(id, (msg) => {
    console.log("msg", msg);
    const msgData = JSON.parse(msg.data);

    uploadMessage.value = msgData.message;
    progress.value = msgData.progress;
    if (msgData.code === 0) {
      progressStatus.value = "exception";
    }

    if (progress.value === 100) {
      progressStatus.value = "success";
    }
  });

  sse.value.onerror = (e) => {
    console.log("e", e);
    sse.value.close();
  };
};

const getPageVersionData = async (productCode) => {
  const res = await apiPageVersionList(productCode);
  if (res.code === 200) {
    pageVersionData.value = res.data;
  }
};

const onUpload = async (fileObject) => {
  const id = nanoid();
  listenSSE(id);

  let fd = new FormData(); // 新建一个FormData()对象，这就相当于你新建了一个表单
  fd.append("file", fileObject.file);
  fd.append("type", "page");
  fd.append("id", id);

  let { data } = await apiResourceUpload(fd);

  dataForm.name = data.name;
  dataForm.ext = data.ext;
};

const getPath = (name) => {
  const info = name.split(".");
  return getImgPath(info[0], info[1]);
};

const onSelect = (value) => {
  resourceVisible.value = false;
  dataForm.thumbnail = value;
};

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
    portId: indexPort.id,
  };

  await pageStore.getPageData(sendData);
};

// 重置表单数据
const resetForm = () => {
  dataForm.id = "";
  dataForm.title = "";
  dataForm.name = "";
  dataForm.version = "";
  dataForm.useVersionRoute = 0;
  dataForm.portId = "";
  dataForm.productCode = "";
  dataForm.fileName = "";
  dataForm.thumbnail = "";
  dataForm.mark = "";
};

// 赋值表单数据
const setForm = (value) => {
  dataForm.id = value.id;
  dataForm.title = value.title;
  dataForm.name = value.name;
  dataForm.version = value.version;
  dataForm.useVersionRoute = value.useVersionRoute;
  dataForm.portId = value.portId;
  dataForm.productCode = value.productCode;
  dataForm.fileName = value.fileName;
  dataForm.thumbnail = value.fileName;
  dataForm.mark = value.mark;
};

const onUploadClick = () => {
  uploadVisible.value = true;
};
const onUploadClose = () => {
  uploadVisible.value = false;

  uploadMessage.value = "";
  progress.value = "";
  progressStatus.value = "";

  // 关闭 sse 连接
  if (sse.value) {
    sse.value.close();
  }

  getData();
};
const onUploadSave = () => {};
const onUploadOpen = () => {
  // 关闭 sse 连接
  if (sse.value) {
    sse.value.close();
  }

  uploadMessage.value = "";
  progress.value = 0;
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

const onSelectResourceClick = () => {
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

const onOpen = () => {
  getPageVersionData(dataForm.productCode);
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

  resetForm();

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