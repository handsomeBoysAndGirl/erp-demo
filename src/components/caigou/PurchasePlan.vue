<template>
  <!-- 采购计划单 -->
  <section>
    <el-form :inline="true" :model="uploadData" class="demo-form-inline">
      <el-form-item :label="dtype == 1 ? '供应商' : '客户'">
        <el-autocomplete
          class="inline-input"
          v-model="uploadData.wanglai"
          :fetch-suggestions="querySearch"
          value-key="name"
          placeholder="请输入内容"
          
          :trigger-on-focus="false"
          @select="handleSelect"
          :disabled="!canEdit"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
            <el-form-item label="单据编号">
        <el-input disabled v-model="uploadData.danhao"></el-input>
      </el-form-item>
          <el-form-item label="单据日期">
        <el-date-picker
          disabled
          v-model="uploadData.date"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label="销售范围" v-show="uploadData.wanglai != null && uploadData.wanglai.length>0">
        <el-tag type="success" v-for="(item,index) in allowfw" :key='index'>{{item}}</el-tag>
      </el-form-item>

      <el-form-item label="控销范围" v-show="uploadData.wanglai != null && uploadData.wanglai.length>0">
        <el-tag type="danger" v-for="(item,index) in banfw" :key='index'>{{item}}</el-tag>
      </el-form-item>
      <br>
      <el-form-item label="经手人">
        <el-input disabled="disabled" v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="制单人">
        <el-input disabled="disabled" v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="审核人">
        <el-input disabled="disabled" v-model="userInfo.name"></el-input>
      </el-form-item>


       <el-form-item label="配送方式" v-if="dtype == 2">
          <el-select v-model="psType" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      

       <el-form-item label="销售方式" v-if="dtype == 2">
          <el-select v-model="psType" clearable placeholder="请选择">
            <el-option
              v-for="item in saleType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
  



      <el-form-item label="摘要">
        <el-input :disabled="!canEdit" style="width:500px" v-model="uploadData.zhaiyao"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input :disabled="!canEdit" style="width:500px" v-model="uploadData.beizhu"></el-input>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { wanglai } from "@/utils/api";
export default {
  name: "purchasePlan",
  props: {
    dtype: {
      type: Number,
      default: 1
    },
    uploaddata: {
      type: Object,
      default: {}
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isFp:false,
      psType:2,
      options:[{label:"自提",value:1},{label:"公司配送",value:2}],
      saleType:[{label:"有票销售",value:1},{label:"无票销售",value:2}],
      uploadData: {},
      userInfo: {},
      allowfw:{},
      banfw:{}
    };
  },
  watch: {
    uploaddata(val) {
      this.uploadData = val;
      this.querySearch(val.wanglai,(wanglaiData) => {
        this.$emit("wanglaiInfo", wanglaiData.find((item) => val.bw_id == item.bw_id));
      });
    },
    dtype(val) {
      console.log(val);
    }
  },
  methods: {
    querySearch(queryString, cb) {
      wanglai({ dtype: this.dtype,name: queryString })
        .then(res => {
          res.wanglaiInfo.forEach(item => {
            item.value = `${item.name}  ${item.suoxie}`;
          });
          cb(res.wanglaiInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelect(item) {
      console.log(item);
      this.$emit("wanglaiInfo", item);
      this.allowfw = item.fw;
      this.banfw = item.fwc;
      this.uploadData.bw_id = item.bw_id;
    },
    getUserInfo() {
      let user = JSON.parse(localStorage.getItem('userInfo'));
      this.userInfo = user;
      this.uploadData.be_id = 
      this.uploadData.be_id2 = 
      this.uploadData.be_id3 = 
      this.uploadData.be_id4 = user.be_id;
      // this.$axios
      //   .post("/api/user")
      //   .then(res => {
      //     this.uploadData.be_id = res.data.be_id;
      //     this.uploadData.be_id2 = res.data.be_id;
      //     this.uploadData.be_id3 = res.data.be_id;
      //     this.uploadData.be_id4 = res.data.be_id;
      //     this.userInfo = res.data;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
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
    Date.prototype.Format = function (fmt) { 
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "h+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    this.uploadData.date = new Date().Format("yyyy-MM-dd");
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
