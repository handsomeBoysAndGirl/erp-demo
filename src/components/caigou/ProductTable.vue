<template>
  <el-table
    show-summary
    :summary-method="getSummaries"
    :data="tableData"
    @cell-click="hasSelectedRow"
    stripe
    style="width: 100%"
  >
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column prop="name" label="品名" width="180"></el-table-column>
    <el-table-column prop="info" label="产品相关信息" width="180"></el-table-column>
    <el-table-column prop="pihao" label="批号"></el-table-column>
    <el-table-column prop="riqi" label="生产日期"></el-table-column>
    <el-table-column prop="xiaoqi" label="有效期"></el-table-column>
    <el-table-column label="数量">
      <template slot-scope="scope">
        <div v-if="status === 'edit'">
          <el-input
            @keyup.alt.delete.native="deleteRow(scope.$index, tableData)"
            type="number"
            min="0"
            :class="numbersequal(scope.row.shuliang,scope.row.step)? '':'error'"
            :step="scope.row.step"
            v-model="scope.row.shuliang"
          ></el-input>
        </div>
        <div v-else>
          <span>{{scope.row.shuliang}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="danwei" label="单位"></el-table-column>
    <el-table-column label="单价">
      <template slot-scope="scope">
        <div v-if="status === 'edit'">
          <el-input
            type="number"
            @keyup.alt.delete.native="deleteRow(scope.$index, tableData)"
            v-model="scope.row.price"
          ></el-input>
        </div>
        <div v-else>
          <span>{{scope.row.price}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="heji" label="合计">
      <template slot-scope="scope">
        <span>{{ multiplication(parseFloat(scope.row.price) , parseFloat(scope.row.shuliang))}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tablelist: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      default: "edit"
    }
  },
  data() {
    return {
      tableData: [],
      sumPrices: []
    };
  },
  watch: {
    tablelist(val) {
      this.tableData = val;
      console.log(val);
    }
  },
  methods: {
    hasSelectedRow(row){
      console.log(12312312)
        this.$emit('hasSelectedRows',row)
    },
    //求余精度处理
    numbersequal(a, b) {
      let number = 10000;
      return (a * number) % (b * number) == 0;
    },
    //乘法精度处理
    multiplication(a, b) {
      let number = 10000;
      return (a * number * (b * number)) / 100000000;
    },
    //键盘输入事件
    sumPrice(row, index) {
      console.log(row, index);
    },
    getSummaries(param) {
      let this_ = this;
      const { columns, data } = param;
      const sums = [];
      let values = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        if (column.property === "heji") {
          values = data.map(item =>
            Number(this_.multiplication(item.shuliang, item.price))
          );
        }
        if (index === 9) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });
      this_.sumPrices = sums;
      return sums;
    },
    deleteRow(index, rows) {
      console.log(index,rows);

      //rows.splice(index, 1);
      this.$emit('deleteRow',index)
    }
  },
  created() {
    console.log(this.tablelist, "-----");
  }
};
</script>

<style scoped>
.error >>> input {
  border-color: red;
}
</style>