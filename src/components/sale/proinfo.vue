<template>
<el-collapse
    v-model="activeNames"
    @change="handleChange"
    style="font-size:5px;line-height:2px;"
    :class="showbox ? 'activeTop' : ''"
  >
    <el-collapse-item
      title="药品信息"
      name="1"
      style="border-top:2px solid #409EFF;"
    >
      <el-form label-width="80px"  class="item">
          <span>名称：{{ proinfos.name }}</span>
          <span>规格：{{ proinfos.guige }}</span>
          <span>厂家：{{ proinfos.factory }}</span>
          <span>剂型：{{ proinfos.jxInfo }}</span>
          <span>销售基数：{{ proinfos.step}}{{ proinfos.danwei}}</span>
          <span>当前库存：{{ proinfos.maxShuliang }}</span>
          <span>采购价:{{ proinfos.cb}}</span>
          <span>件装数量:{{ proinfos.jianzhuang }}</span>
      </el-form>
    </el-collapse-item>
    <el-collapse-item
      title="最近十次价格"
      name="2"
      style="border-top:2px solid #409EFF;"
    >
      <el-table :data="tableData" stripe  height="400" style="width: 100%">
        <el-table-column prop="date" label="日期" width="100">
        </el-table-column>
        <el-table-column prop="shuliang" label="数量" width="50"> </el-table-column>
        <el-table-column prop="jiage" label="价格" width="50">
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import { getRecentPrice } from "@/utils/api"
export default {
    props: {
    proinfo: {
      type: Object,
      default:()=>{ return {}}
    }
  },
  watch:{
     proinfo(val){
        this.proinfos = val
        if(val != null){
          this.activeNames = ["1","2"]
          this.getRecentPrice_ten(val)
        }
     } 
  },
  data() {
    return {
      proinfos:{},
      showbox: false,
      activeNames: [],
      tableData:[]
    };
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getRecentPrice_ten(val){
      let pramas = {
          psk_id:val.psk_id,
          bp_id:val.bp_id
      };
      getRecentPrice(pramas).then(res=>{
          if(res.price.length > 1){
            this.tableData = res.price
          }
        })
    },
    handleScroll(event) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        scrollTop >= 100 ? (this.showbox = true) : (this.showbox = false);
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-top:-5px;
  margin-bottom: 0px !important;
}
.activeTop {
  position: fixed;
  top: 0;
  width: 100%;
}
.item>span{
  display: flex;
  flex-direction: column;
  margin-bottom: 2px;
}
</style>
