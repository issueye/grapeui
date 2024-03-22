<template>
<vxe-modal v-model="visible" size="small" show-footer>
    <template #title>
        <span>{{ title }}</span>
    </template>
    <template #default>
        <slot name="body"></slot>
    </template>
    <template #footer>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </template>
</vxe-modal>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
})

</script>

<style lang="scss" scoped>
</style>
