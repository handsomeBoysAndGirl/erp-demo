<template>
<el-collapse
    v-model="activeNames"
    @change="handleChange"
    :class="showbox ? 'activeTop' : ''"
  >
    <el-collapse-item
      title="药品信息"
      name="1"
      style="border-top:2px solid #409EFF;"
    >
      <el-form label-width="80px">
        <el-form-item label="名称:">
          <span>{{ proinfos.name }}</span>
        </el-form-item>
        <el-form-item label="规格:"> 
          <span>{{ proinfos.info }}</span>
        </el-form-item>
        <el-form-item label="厂家:">
          <span>{{ proinfos.factory }}</span>
        </el-form-item>
        <el-form-item label="剂型:">
          <span>{{ proinfos.jx }}</span>
        </el-form-item>
        <el-form-item label="销售基数:">
          <span>{{ proinfos.ean_step }}{{ proinfos.danwei}}</span>
        </el-form-item>
        <el-form-item label="当前库存:">
          <span>{{ proinfos.maxshuliang }}</span>
        </el-form-item>
        <el-form-item label="采购价:">
          <span>{{ proinfos.cb }}</span>
        </el-form-item>
        <el-form-item label="件装数量:">
          <span>{{ proinfos.jianzhuang }}</span>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item
      title="最近十次价格"
      name="2"
      style="border-top:2px solid #409EFF;"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="100">
        </el-table-column>
        <el-table-column prop="name" label="数量" width="50"> </el-table-column>
        <el-table-column prop="address" label="价格" width="50">
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
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
    handleScroll(event) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop >= 150 ? (this.showbox = true) : (this.showbox = false);
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px !important;
}
.activeTop {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
