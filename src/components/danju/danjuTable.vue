<template>
  <section>
    <div class="explanation">
      <span>标签说明：</span>
      <el-tag type="warning">备注</el-tag>
      &nbsp;
      <el-tag>摘要</el-tag>
    </div>
    <el-table :data="tablelist" stripe style="width: 100%">
      <!-- <el-table-column prop="di_id" label="ID" width="80"></el-table-column> -->
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column prop="danhao" label="单号" width="180"></el-table-column>
      <el-table-column prop="date" label="日期" width="100"></el-table-column>
      <el-table-column prop="typeInfo" label="单据类型"  width="180"></el-table-column>
      <el-table-column label="往来">
        <template slot-scope="scope">
          <span>{{scope.row.wanglai}}</span>
      &nbsp;
          <el-tag v-if="scope.row.zhaiyao != ''">{{scope.row.zhaiyao}}</el-tag>
     &nbsp;
          <el-tag type="warning" v-if="scope.row.beizhu != ''">{{scope.row.beizhu}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="执行状态"  width="100">
        <template slot-scope="scope">
                <span v-show='scope.row.runtype == 3'><el-tag type="success">执行完成</el-tag></span>
                <span v-show='scope.row.runtype == 1'><el-tag>等待执行</el-tag></span>
                <span v-show='scope.row.runtype == 0'><el-tag type="warning">正在执行</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column prop="heji_pre" label="总金额"  width="100"></el-table-column>
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
  methods:{
    handleClick(row) {
      this.$emit("showInfo", row);
      console.log(row);
    }
  }
};
</script>

<style>
</style>