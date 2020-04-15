<template>
  <div class="about">
    <div class="mainHead">
      <div class="item">
        <div>
          <h2 class="numbers">{{money.balance.toFixed(2)}}元</h2>
          <h3>余额</h3>
          <div style="margin-top:15px">
            <el-link type="success" style="margin-right:15px" @click="recharge(2)">提现</el-link>
            <el-link type="success" @click="recharge(1)">充值</el-link>
          </div>
        </div>
      </div>
      <span class="line"></span>
      <div class="item">
        <div>
          <h2 class="numbers">{{money.wfc.toFixed(2)}}元</h2>
          <h3>正在确认（WFC）</h3>
        </div>
      </div>
      <div class="item">
        <div>
          <h2 class="numbers">{{money.volume}}单</h2>
          <h3>交易总笔数</h3>
        </div>
      </div>
    </div>


    <!-- mainHead over -->
    <h1 style="margin-top:40px;margin-bottom:15px">流水详情</h1>
    <hr style="margin-bottom:10px">
    <!-- money  detail begin -->
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="往来单位"
      width="300">
    </el-table-column>
    <el-table-column
      prop="city"
      label="单位类型"
      width="120">
       <template slot-scope="scope">
           <div>
          <el-link type="success" style="margin-right:15px" v-show="scope.row.type == 2">供应商</el-link>
          <el-link type="danger" style="margin-right:15px" v-show="scope.row.type == 1">客户</el-link>
      </div>
       </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="350">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="金额"
      width="120"
      >
      <template slot-scope="scope">
           <div>
          <el-link type="success" style="margin-right:15px" v-show="scope.row.type == 2">{{scope.row.money}}</el-link>
          <el-link type="danger" style="margin-right:15px" v-show="scope.row.type == 1">{{scope.row.money}}</el-link>
      </div>
      </template>  
     
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          money:{
            balance:150.00,
            wfc:15232.00,
            volume:150
          },
          tableData: [{
            date: '2016-05-02',
            name: '贵州山海医药有限公司',
            type:'1',
            address: '上海市普陀区金沙江路 1518 弄',
            money:-150.12
          }, {
            date: '2016-05-04',
            name: '遵义市银花药业有限公司',
            type:'1',
            address: '上海市普陀区金沙江路 1517 弄',
            money:-35215.25
          }, {
            date: '2016-05-01',
            type:'2',
            name: '	务川仡佬族苗族自治县镇南镇卫生院',
            address: '上海市普陀区金沙江路 1519 弄',
            money:152215.24
          }]
        }
      },
       methods: {
          handleClick(row) {
            console.log(row);
          },
          recharge(type){
            console.log(12222222)
            let msg = type == 1 ?"请输入充值金额数":"请输入提现金额数"
            this.$prompt(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
          inputErrorMessage: '金额必须为数字'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    }
    }
  </script>

<style  scoped>
.mainHead {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  color: #ffffff;
  background: #3c8dc4;
}
.item:nth-child(4) {
  background: #ff9933;
}
.line {
  height: 150px;
  width: 1px;
  margin-top: 25px;
  background: #ffffff;
}
.numbers {
  margin-bottom: 15px;
}
.item {
  width: 40%;
  height: 200px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>