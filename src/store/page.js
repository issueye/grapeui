import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import {
    apiPageList
} from "@/apis/page/page";

import {
    apiRuleList
} from "@/apis/page/rule";
import {
    apiGzipFilterList
} from '@/apis/page/gzip_filter';

import {
    apiPortList,
} from "@/apis/page/port";

export const usePageStore = defineStore(
    'page',
    () => {
        const indexPort = reactive({
            id: '',
            port: 0,
            state: false,
            certId: '',
            isTLS: false,
            mark: '',
            updatedAt: '',
            createdAt: '',
        })

        const indexPageId = ref('')

        const pageNum = ref(1)
        const pageSize = ref(10)
        // 查询表单
        const form = reactive({
            condition: "",
        });

        const tableData = ref([])
        const total = ref(0)

        const pageTableData = ref([])
        const pageTotal = ref(0)

        const ruleTableData = ref([])
        const ruleTotal = ref(0)

        const gzipFilterTableData = ref([])
        const gzipFilterTotal = ref(0)

        const getData = async () => {
            let sendData = {
                condition: form.condition,
                pageNum: pageNum.value,
                pageSize: pageSize.value,
            };

            let res = await apiPortList(sendData)
            if (res.code == 200) {
                if (res.data) {
                    tableData.value = res.data;
                }

                if (res.pageInfo) {
                    total.value = res.pageInfo.total;
                }
            }
        }

        /**
         * 获取页面数据
         */
        const getPageData = async (params) => {
            let res = await apiPageList(params);
            if (res.code === 200) {
                if (res.data) {
                    pageTableData.value = res.data;
                }

                if (res.pageInfo) {
                    pageTotal.value = res.pageInfo.total;
                }
            }
        }

        const getRuleData = async (params) => {
            let res = await apiRuleList(params)
            if (res.code === 200) {

                if (res.data) {
                    ruleTableData.value = res.data;
                }

                if (res.pageInfo) {
                    ruleTotal.value = res.pageInfo.total;
                }
            }
        }

        const getGzipFilterData = async (params) => {
            let res = await apiGzipFilterList(params)
            if (res.code === 200) {

                if (res.data) {
                    gzipFilterTableData.value = res.data;
                }

                if (res.pageInfo) {
                    gzipFilterTotal.value = res.pageInfo.total;
                }
            }
        }

        const setIndexPort = (row) => {
            indexPort.id = row.id;
            indexPort.port = row.port;
            indexPort.state = row.state;
            indexPort.certId = row.certId;
            indexPort.isTLS = row.isTLS;
            indexPort.mark = row.mark;
            indexPort.updatedAt = row.updatedAt;
            indexPort.createdAt = row.createdAt;

            let sendData = {
                condition: "",
                pageNum: 1,
                pageSize: 10,
                portId: indexPort.id,
            };

            getPageData(sendData);
            getRuleData(sendData);
            getGzipFilterData(sendData);
        }

        return {
            indexPort,
            tableData,
            form,
            pageNum,
            pageSize,
            total,
            pageTableData,
            pageTotal,
            ruleTableData,
            ruleTotal,
            gzipFilterTableData,
            gzipFilterTotal,
            indexPageId,

            getData,
            getPageData,
            getRuleData,
            getGzipFilterData,
            setIndexPort,
        }
    },
    {
        persist: {
            key: 'page_store',
            storage: localStorage,
        },
    }
)