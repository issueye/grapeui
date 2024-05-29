import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import {
    apiPageList
} from "@/apis/page/page";

import {
    apiRuleList
} from "@/apis/page/rule";

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

        const pageTableData = ref([])
        const pageTotal = ref(0)

        const ruleTableData = ref([])
        const ruleTotal = ref(0)

        /**
         * 获取页面数据
         */
        const getPageData = async (params) => {
            let res = await apiPageList(params);
            if (res.code === 200) {
                pageTableData.value = res.data;
                pageTotal.value = res.pageInfo.total;
            }
        }

        const getRuleData = async (params) => {
            let res = await apiRuleList(params)
            if (res.code === 200) {
                ruleTableData.value = res.data;
                ruleTotal.value = res.pageInfo.total;
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
        }

        return {
            indexPort,
            pageTableData,
            pageTotal,
            ruleTableData,
            ruleTotal,
            getPageData,
            getRuleData,
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