<template>
  <div class="productInput-box">
     <ChoosePro ref="choosepro" @selectedData= "handleSaleSelect"></ChoosePro>
    <el-autocomplete
      class="productInput"
      v-model="product"
      :disabled="dis"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
    <div class="productInput-type">
      <span>输入类型：</span>
      <el-checkbox v-model="checked" disabled v-for="(item,index) in fanweic" :key="index">{{item}}</el-checkbox>
    </div>
  </div>
</template>

<script>

import ChoosePro from "@/components/sale/choosePro"
export default {
  components: {
    ChoosePro
  },
  name: "productInput",
  props: {
    dtype: {
      type: Number,
      default:1
    },
    bwid: {
      type: String,
      default: "0"
    },
    fanweic: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      product: "",
      checked: true,
      dis: true
    };
  },
  watch: {
    bwid() {
      if (this.bwid != "0") {
        this.dis = false;
      }
    }
  },
  methods: {
    querySearch(queryString, cb) {
      this.$axios
        .post("/api/product")
        .then(res => {
          cb(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelect(value) {
      this.product = "";
      if(this.dtype == 2){
            this.$refs.choosepro.switchPro(value.bp_id,value.name,this.bwid)

      }else{
        this.$emit("productInfo", value);
      }
    },
    handleSaleSelect(value){
        this.product = "";
         this.$emit("productInfo", value);
    }
  }
};
</script>

<style scoped>
.productInput {
  width:100%;
}
.productInput >>> div {
  width: 100%;
}
.productInput-box {
  padding: 15px 0 0 0;
}
.productInput-type {
  margin-top: 15px;
}
</style>