<template>
  <!-- 填写采购计划单 -->
  <section>
    <div class="fillIn-header">
      <h1>填写采购计划单</h1>
      <el-tag size="mini">新建单据</el-tag>
    </div>
    <div class="fillIn-body">
      <PurchasePlan @wanglaiInfo="wanglaiInfo"></PurchasePlan>
      <ProductTable :status="'edit'" :tablelist="tableList"></ProductTable>
      <ProductInput @productInfo="productInfo" :bwid="wanglaiList.bw_id" :fanweic="fanwei_c"></ProductInput>
    </div>
    <div class="fillIn-footer">
      <span>删除行：Alt + Del</span>
    </div>
  </section>
</template>

<script>
import PurchasePlan from "@/components/caigou/PurchasePlan";
import ProductTable from "@/components/caigou/ProductTable";
import ProductInput from "@/components/caigou/ProductInput";
export default {
  name: "fillIn",
  components: {
    PurchasePlan,
    ProductTable,
    ProductInput
  },
  data() {
    return {
      fanwei_c: [],
      wanglaiList: {
        bw_id: "0"
      },
      tableList: []
    };
  },
  methods: {
    wanglaiInfo(value) {
      this.wanglaiList = value;
      this.fanwei_c = value.fanwei_c.split(",");
      console.log(value, "*******");
    },
    productInfo(value) {
      console.log(value, "-------------");
      this.tableList.push(value);
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
</style>