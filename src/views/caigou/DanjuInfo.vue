<template>
  <!-- 填写采购计划单 -->
  <section>
    <div class="fillIn-header">
      <h1 v-if="dtypes == 8">销售计划单详情</h1>
      <h1 v-else>采购计划单详情</h1>
      <el-tag size="mini">审核中</el-tag>
    </div>
    <div class="fillIn-body">
      <PurchasePlan :uploaddata="danjuList" :dtype="dtypes" :canEdit="false" ref="childPlan" @wanglaiInfo="wanglaiInfo"></PurchasePlan>
      <ProductTable ref="childTable" :status="'123'" :tablelist="tableList"></ProductTable>
      <div class="caozuo">
        <el-button @click="back">退出</el-button>
      </div>
    </div>
    <div class="fillIn-footer">
      <span>删除行：Alt + Del</span>
    </div>
  </section>
</template>

<script>
import PurchasePlan from "@/components/caigou/PurchasePlan";
import ProductTable from "@/components/caigou/ProductTable";
import {getDanjuDetail} from "@/utils/api"
export default {
  name: "fillIn",
  components: {
    PurchasePlan,
    ProductTable
  },
  data() {
    return {
      dtypes:2,
      wanglaiList: {
        bw_id: "0"
      },
      tableList: [],
      danjuList: {}
    };
  },
  methods: {
    wanglaiInfo(value) {
      this.wanglaiList = value;
     // this.fanwei_c = value.fanwei_c.split(",");
    },
    sendDraft(type) {
      console.log(this.$refs.childPlan.uploadData);
      console.log(this.$refs.childTable.tableData);
      console.log(this.$refs.childTable.sumPrices);
    },
    getdanjuInfo(di_id) {
      getDanjuDetail({di_id: di_id})
      .then(res => {
        console.log(res)
        this.danjuList = res.danjuIndex;
        this.tableList = res.danjulist;
      })
      .catch(res => {
        console.log(res)
      })
     
    },
    back() {
      this.$router.push(`/danju`);
    }
  },
  created() {
      this.getdanjuInfo(this.$route.params.di_id);
      if(this.$route.query.hasOwnProperty("type")){
          this.dtypes = this.$route.query.type
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