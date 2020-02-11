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
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="制单人">
        <el-input disabled="disabled" v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="审核人">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="单据日期">
        <el-date-picker disabled v-model="uploadData.data" type="date" placeholder="选择日期"></el-date-picker>
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
  data() {
    return {
      formInline: {
        wanglai: "",
        data: "",
        region: ""
      },
      uploadData: {
        bw_id: "", //往来抬头
        be_id: "", //经手人
        be_id2: "", //制单人
        be_id3: "", //审核人
        be_id4: "", //产品经理
        type: "", //单据类型
        date: "", //单据日期
        danhao: "", //单号
        beizhu: "",
        data: "",
        zhaiyao: ""
      },
      userInfo: {}
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
      this.$emit("wanglaiInfo", item);
      console.log(item);
    },
    getUserInfo() {
      this.$axios
        .post("/api/user")
        .then(res => {
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
    this.formInline.data = new Date();
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