
<template>
<div style="">
<!-- Table -->

<el-dialog title="选择商品具体批次" 
  
  :lock-scroll='locakScreen'
  :visible.sync="dialogTableVisible">
  <div style="margin-top: -25px;margin-bottom:15px;width:50%;height:50px">
  <el-input placeholder="请输入商品名" v-model="term" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
   <el-table
    ref="singleTable"
    :data="gridData"
    highlight-current-row
    @current-change="handleCurrentChange"
    @cell-dblclick="choosePro"
     max-height="400"
    style="width: 100%;">
    <el-table-column
      type="index"
       label="行号"
      width="50">
    </el-table-column>
    <el-table-column
      property="name"
      label="品名"
      width="120">
    </el-table-column>
    <el-table-column
      property="info"
      label="产品信息">
    </el-table-column>
    <el-table-column
      property="pihao"
      label="批号">
    </el-table-column>
    <el-table-column
      property="riqi"
      label="生产日期">
    </el-table-column>
    <el-table-column
      property="xiaoqi"
      label="有效期">
    </el-table-column>
    <el-table-column
      property="maxshuliang"
      label="可售库存">
    </el-table-column>
    <el-table-column
      property="jiage"
      label="售价">
    </el-table-column>
    <el-table-column
      property="factory"
      label="厂家">
    </el-table-column>
  </el-table>
  <el-button-group style="height:50px;">
  <el-button type="primary" @click="hasSelected">确定</el-button>
  <el-button type="info"  @click="switchPro">取消</el-button>
</el-button-group>
</el-dialog>
</div>
</template>
<script>
import { getskuall } from "@/utils/api";
  export default {
    data() {
      return {
        term:'',
        bwid:'',
        bpid:'',
        locakScreen:true,
        gridData: [],
         currentRow: null,
         dialogTableVisible:false,
         input3:'',
      };
    },
    methods: {
      choosePro(row){
        this.sendData(row)
       
      },
      hasSelected(){
         if(this.currentRow == null){   this.$message({
          message: '请选择药品后再试',
          type: 'warning'
        });}else{
            this.sendData(this.currentRow);
        }
      },
      switchPro(bpid,name,bwid){
       
        this.dialogTableVisible = !this.dialogTableVisible;
        if(this.dialogTableVisible && bpid != '' && bwid !=''){
             this.term = name
             this.bwid= bwid
             this.bpid = bpid
             getskuall({'term':name,'bw_id':bwid,'bp_id':bpid}).then(res=>{
               console.log(res)
               if(res.msg = 'success'){
                 this.gridData = res.data
               }
             })
        }
      },
      sendData(item){
         this.$emit('selectedData',item)
         this.dialogTableVisible = !this.dialogTableVisible;

      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  };
</script>


<style scoped>
  .el-button-group {
    display: flex;
    margin-top:15px;
    justify-content: flex-end;
  }
</style>