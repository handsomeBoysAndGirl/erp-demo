<template>
  <el-autocomplete
    width="500"
    v-model="wanglai"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    :trigger-on-focus="false"
    @select="handleSelect"
  ></el-autocomplete>
</template>

<script>
export default {};
</script>

<style>
</style>