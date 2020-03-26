<template>
  <section>
    <el-table :data="tablelist" stripe style="width: 100%">
      <el-table-column prop="di_id" label="ID" width="80"></el-table-column>
      <el-table-column prop="danhao" label="单号" width="180"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column label="单据类型">
        <template slot-scope="scope">
          <span v-show="scope.row.type==1">采购计划单</span>
          <span v-show="scope.row.type==2">销售单</span>
        </template>
      </el-table-column>
      <el-table-column prop="bw_id" label="往来"></el-table-column>
      <el-table-column label="执行状态">
            <template slot-scope="scope">
                   <span v-show='scope.row.runtype == 3'><el-tag type="success">执行完成</el-tag></span>
                   <span v-show='scope.row.runtype == 1'><el-tag>等待执行</el-tag></span>
                   <span v-show='scope.row.runtype == 2'><el-tag type="warning">正在执行</el-tag></span>
           </template>
      </el-table-column>
      <el-table-column prop="heji_pre" label="总金额"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  name: "danjuTable",
  props: {
    tablelist: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleClick(row) {
      this.$emit("showInfo", row);
      console.log(row);
    }
  }
};
</script>

<style>
</style>