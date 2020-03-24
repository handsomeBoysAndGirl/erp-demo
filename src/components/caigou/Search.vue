<template>
  <!-- 采购计划单 -->
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item :label="dtype == 1 ? '供应商' : '客户'">
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
      <el-form-item label="单据日期">
        <el-date-picker
          v-model="uploadData.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="单据编号">
        <el-input v-model="uploadData.danhao"></el-input>
      </el-form-item>

      <el-form-item label="摘要">
        <el-input style="width:500px" v-model="uploadData.zhaiyao"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input style="width:500px" v-model="uploadData.beizhu"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-button @click="search">按过滤条件搜索</el-button>
        <el-button @click="searchAll">搜索所有</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "search",
  props: {
    dtype: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      formInline: {
        wanglai: "",
        data: "",
        region: ""
      },
      uploadData: {
        bw_id: "", //往来抬头
        type: this.dtype, //单据类型
        date: "", //单据日期
        danhao: "", //单号
        beizhu: "",
        zhaiyao: ""
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
      //   this.$emit("wanglaiInfo", item);
      this.uploadData.bw_id = item.bw_id;
    },
    search() {
      this.$emit("search", this.uploadData);
    },
    searchAll() {
      this.uploadData = {
        bw_id: "", //往来抬头
        type: this.dtype, //单据类型
        date: "", //单据日期
        danhao: "", //单号
        beizhu: "",
        zhaiyao: ""
      };
      this.$emit("searchAll", this.uploadData);
    }
  },
  created() {}
};
</script>

<style scoped>
.inline-input >>> div {
  width: 500px;
}
</style>