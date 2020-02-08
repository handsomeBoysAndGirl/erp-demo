<template>
  <!-- 采购计划单 -->
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="供应商">
        <el-autocomplete
          class="inline-input"
          v-model="formInline.wanglai"
          :fetch-suggestions="querySearch"
          value-key="name"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="经手人">
        <el-input v-model="formInline.wanglai"></el-input>
      </el-form-item>

      <el-form-item label="制单人">
        <el-input disabled="disabled" v-model="formInline.wanglai"></el-input>
      </el-form-item>

      <el-form-item label="审核人">
        <el-input v-model="formInline.wanglai"></el-input>
      </el-form-item>

      <el-form-item label="单据日期">
        <el-date-picker disabled v-model="formInline.data" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="单据编号">
        <el-input v-model="formInline.wanglai"></el-input>
      </el-form-item>

      <el-form-item label="摘要">
        <el-input style="width:500px" v-model="formInline.wanglai"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input style="width:500px" v-model="formInline.wanglai"></el-input>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "purchasePlan",
  data() {
    return {
      formInline: {
        wanglai: "",
        data: "",
        region: ""
      }
    };
  },
  methods: {
    querySearch(queryString, cb) {
      this.$axios
        .post("/api/wanglai")
        .then(res => {
          cb(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  created() {
    this.formInline.data = new Date();
  }
};
</script>

<style scoped>
.inline-input >>> div {
  width: 500px;
}
</style>