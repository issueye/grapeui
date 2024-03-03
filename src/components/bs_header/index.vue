<template>
<div class="bs-header-box">
    <div>
        <span class="bs-header-title">{{ props.title }}</span>
        <el-divider direction="vertical" />
        <span class="bs-header-description">{{ props.description }}</span>
    </div>
    <div>
        <slot name="actions"></slot>
    </div>
</div>
</template>

<script>
import {
    defineProps,
    toRefs
} from 'vue';

const props = defineProps({
    title: '',
    description: '',
})

const {
    title,
    description
} = toRefs(props);
</script>

<style lang="scss" scoped>
.bs-header-box {
    width: 100%;
    height: 56px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #D9D9D9;

    .bs-header-title {
        font-size: 20px;
        font-weight: 600;
        margin-left: 20px;
    }
}
</style>
