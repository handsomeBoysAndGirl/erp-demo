<template>
  <!-- 填写销售计划单 -->
  <section>
    <ChoosePro></ChoosePro>
    <div class="fillIn-header">
      <h1>填写销售订单</h1>
      <el-tag size="mini">新建单据</el-tag>
    </div>
    <div class="fillIn-body">
      <el-container>
        <el-main>
          <PurchasePlan
            :dtype="2"
            ref="childPlan"
            :uploaddata="uploadData"
            @wanglaiInfo="wanglaiInfo"
          ></PurchasePlan>
          <ProductTable
            ref="childTable"
            :status="'edit'"
            :tablelist="tableList"
          ></ProductTable>
          <ProductInput
            @productInfo="productInfo"
            :dtype="2"
            :bwid="wanglaiList.bw_id"
            :fanweic="fanwei_c"
          ></ProductInput>
          <div class="caozuo">
            <el-button @click="sendDraft">保存草稿</el-button>
            <el-button @click="sendDraft">审核单据</el-button>
            <el-button @click="sendDraft">退出</el-button>
          </div>

          <div class="fillIn-footer">
            <span>删除行：Alt + Del</span>
          </div>
        </el-main>
        <el-aside width="200px" style="">
          <ProInfo ref="proinfo"> </ProInfo>
        </el-aside>
      </el-container>
    </div>
  </section>
</template>

<script>
import PurchasePlan from "@/components/caigou/PurchasePlan";
import ProductTable from "@/components/caigou/ProductTable";
import ProductInput from "@/components/caigou/ProductInput";
import ProInfo from "@/components/sale/proinfo";
import ChoosePro from "@/components/sale/choosePro"
export default {
  name: "fillIn",
  components: {
    PurchasePlan,
    ProductTable,
    ProductInput,
    ProInfo,
    ChoosePro
  },
  data() {
    return {
      fanwei_c: [],
      wanglaiList: {
        bw_id: "0"
      },
      scrollDom:null,
      tableList: [],
      uploadData: {
        wanglai: "",
        bw_id: "", //往来抬头
        be_id: "", //经手人
        be_id2: "", //制单人
        be_id3: "", //审核人
        be_id4: "", //产品经理
        type: 1, //单据类型
        date: "", //单据日期
        danhao: "", //单号
        beizhu: "",
        zhaiyao: ""
      }
    };
  },
  methods: {
    wanglaiInfo(value) {
      this.wanglaiList = value;
      this.fanwei_c = value.fanwei_c.split(",");
    },
    productInfo(value) {
      this.tableList.push(value);
    },
    sendDraft() {
      console.log(this.$refs.childPlan.uploadData);
      console.log(this.$refs.childTable.tableData);
      console.log(this.$refs.childTable.sumPrices);
    }
  },
  created() {
    if (this.$route.query.di_id) {
      console.log(123);
      //uploadData
      //tableList
    } else {
      console.log("no");
    }
  }
};
</script>

<style scoped>
.fillIn-header,
.fillIn-body {
  padding: 15px 0;
  border-bottom: 1px solid #dddddd;
}
.fillIn-footer {
  padding: 15px 0;
}
.fillIn-body {
  padding: 15px 0;
}
.fillIn-header h1 {
  display: inline;
  margin-right: 20px;
}
.caozuo {
  margin-top: 15px;
}
</style>
