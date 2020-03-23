
<template>
<div style="">
<!-- Table -->
<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

<el-dialog title="选择商品具体批次" 
  
  :lock-scroll='locakScreen'
  :visible.sync="dialogTableVisible">
  <div style="margin-top: -25px;margin-bottom:15px;width:50%;height:50px">
  <el-input placeholder="请输入商品名" v-model="input3" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
   <el-table
    ref="singleTable"
    :data="gridData"
    highlight-current-row
    @current-change="handleCurrentChange"
     max-height="400"
    style="width: 100%;">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="date"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      property="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址">
    </el-table-column>
  </el-table>
  <el-button-group style="height:50px">
  <el-button type="primary">确定</el-button>
  <el-button type="info" >取消</el-button>
</el-button-group>
</el-dialog>
</div>
</template>
<script>
  export default {
    data() {
      return {
        locakScreen:true,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
         currentRow: null,
         dialogTableVisible:false,
         input3:'',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  };
</script>