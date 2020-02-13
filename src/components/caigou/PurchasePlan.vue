<template>
  <!-- 采购计划单 -->
  <section>
    <el-form :inline="true" :model="uploadData" class="demo-form-inline">
      <el-form-item label="供应商">
        <el-autocomplete
          class="inline-input"
          v-model="uploadData.wanglai"
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
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="制单人">
        <el-input disabled="disabled" v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="审核人">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="单据日期">
        <el-date-picker disabled v-model="uploadData.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="单据编号">
        <el-input disabled v-model="uploadData.danhao"></el-input>
      </el-form-item>

      <el-form-item label="摘要">
        <el-input style="width:500px" v-model="uploadData.zhaiyao"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input style="width:500px" v-model="uploadData.beizhu"></el-input>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "purchasePlan",
  props: {
    dtype: {
      type: Number,
      default: 0
    },
    uploaddata: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      uploadData: {},
      userInfo: {}
    };
  },
  watch: {
    uploaddata(val) {
      this.uploadData = val;
    }
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
      this.$emit("wanglaiInfo", item);
      this.uploadData.bw_id = item.bw_id;
    },
    getUserInfo() {
      this.$axios
        .post("/api/user")
        .then(res => {
          this.uploadData.be_id = res.data.be_id;
          this.uploadData.be_id2 = res.data.be_id;
          this.uploadData.be_id3 = res.data.be_id;
          this.uploadData.be_id4 = res.data.be_id;
          this.userInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setTimeDateFmt(s) {
      // 个位数补齐十位数
      return s < 10 ? "0" + s : s;
    },

    randomNumber() {
      const now = new Date();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let hour = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      month = this.setTimeDateFmt(month);
      day = this.setTimeDateFmt(day);
      hour = this.setTimeDateFmt(hour);
      minutes = this.setTimeDateFmt(minutes);
      seconds = this.setTimeDateFmt(seconds);
      let orderCode =
        "CD" +
        now.getFullYear().toString() +
        month.toString() +
        day +
        Math.round(Math.random() * 1000000).toString();
      return orderCode;
    }
  },
  created() {
    this.uploadData.data = new Date();
    this.uploadData.danhao = this.randomNumber();
    this.getUserInfo();
  }
};
</script>

<style scoped>
.inline-input >>> div {
  width: 500px;
}
</style>