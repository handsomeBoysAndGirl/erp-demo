<template>
  <div>
    <el-container style="margin-top:30px;width:100%;">
      <el-header style="background:#85caf3;">
        <div
          style="width:259px;border-right:1px solid #eeeeee;height:100%;display:flex;align-items: center;"
        >
          <el-autocomplete
            style="margin-right:20px"
            suffix-icon="el-icon-search"
            class="search_input"
            size="mini"
            v-model="search.name"
            :fetch-suggestions="querySearch"
            value-key="name"
            placeholder="请输入内容"
            color="#fff"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
            </template>
          </el-autocomplete>
        </div>
      </el-header>
      <el-container>
        <el-aside
          width="280px"
          style="background:#fff;border-right:1px solid #eeeeee;border-left:1px solid #eeeeee;padding-left:10px"
        >
          <div class="code">
            <span class="demonstration">编号</span>
            <el-date-picker
              v-model="value2"
              class="picker_filter"
              size="mini"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>

          <div class="codelist" style="margin-top:15px">
            <el-checkbox
              v-model="checked"
              style="color:#85c5f3"
              v-for="o in 12"
              :key="o"
            >XS20190604000009</el-checkbox>
          </div>
        </el-aside>
        <el-main>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="#" width="120"></el-table-column>
            <el-table-column prop="name" label="产品" width="120"></el-table-column>
            <el-table-column prop="address" label="规格" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="gsp" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="税率" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="单价" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="金额" show-overflow-tooltip></el-table-column>
          </el-table>

          <el-row>
            <el-button type="primary" style="float:right;margin-top:20px;" plain>提交申请</el-button>
            <h2 style="float:right;margin-top:35px;margin-right:40px;">共计 ￥ 125325.00元</h2>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { wanglai } from "@/utils/api";
export default {
  data() {
    return {
      search: {
        name: ""
      },
      value2: "",
      checked: true,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    pickerOptions() {},
    querySearch(queryString, cb) {
      wanglai({ type: this.dtype })
        .then(res => {
          res.forEach(item => {
            item.value = `${item.name}  ${item.suoxie}`;
          });
          cb(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelect(item) {
      console.log(item, "****");
    },
    handleSelectionChange() {}
  }
};
</script>


<style  scoped>
.code {
  border-bottom: 1px solid #eeeeee;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.el-checkbox {
  margin-bottom: 15px;
}

.el-aside {
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: left;
}

.search_component,
.table {
  padding: 20px;
  height: 100px;
  background: #ebebeb;
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: 0.2s;
  margin: 0 auto;
}
.block {
  display: flex;
  justify-content: space-between;
}

.picker_filter {
  background-color: #fff !important;
  width: 200px;
  margin-left: 50x;
}

/deep/ input::-webkit-input-placeholder {
  color: #fff;
}

/deep/ .el-input__inner {
  background-color: #85c5f3;
  border: 1px solid #fff;
  color: #fff;
}

/deep/ .el-input__suffix {
  color: #fff !important;
}
</style>
