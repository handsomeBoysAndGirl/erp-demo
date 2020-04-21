<template>
  <div>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
       height="550"
      style="width: 100%;"
      @selection-change="SelectionChange"
      :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="name" label="产品" width="120"></el-table-column>
      <el-table-column prop="guige" label="规格" show-overflow-tooltip></el-table-column>
      <el-table-column prop="gsp_show" label="gsp" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="税率" show-overflow-tooltip></el-table-column>
      <el-table-column prop="shuliang" label="数量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="danwei" label="单位" show-overflow-tooltip></el-table-column>
      <el-table-column prop="jiage" label="单价" show-overflow-tooltip></el-table-column>
      <el-table-column prop="jine" label="金额" show-overflow-tooltip></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" class="search_table" style="background-color:#fff !important"  placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  props: {
    tableData: {
      type: Object,
      default:{
          date:'',
          name:'',
          list:[],
          di_id:''
      }
    }
  },
  data(){
      return {
          search: '',
          list:[],
          hasChoosedArr:[]
      }
  },
  watch:{
      tableData(val){
        this.list = val.list
        let hasSelectedArr = new Array()
        this.list.forEach((item,key)=>{
           if(item.checked){
              hasSelectedArr.push(item)
           }
        })
        this.$nextTick(()=>{
            this.toggleSelection(hasSelectedArr)
        })
      }
  },
  mounted(){
    //console.log(this.tableData)
  },
  destroyed(){
    
  },
  methods: {
     toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
    SelectionChange(val){
      if(val.length === this.list.length){
        this.list.forEach((v,k)=>this.list[k]['checked'] = true)
      }else if(val.length  == 0){
          this.list.forEach((v,k)=>this.list[k]['checked'] = false)
      }else{
        let bpArr =  val.map(e=>{
          return e.bp_id;
          })
        this.list.forEach((item,k)=>{
            if(this.$tools.in_array(item.bp_id,bpArr)){
               this.list[k].checked = true
            }else{
               this.list[k].checked = false
            }
        })
      } 
      this.$nextTick(()=>{
          this.tableData.list = this.list;
          this.$emit('ChildrenChange',this.tableData)
      })
    }
  },
  computed:{

  }
};
</script>


<style scoped>
/deep/ .el-input__inner::-webkit-input-placeholder {
  color: #ccc !important;
}

/deep/ .el-input__inner {
  background-color: #fff !important;
  border: 1px solid #ccc !important;
  color: #333 !important;
}
</style>