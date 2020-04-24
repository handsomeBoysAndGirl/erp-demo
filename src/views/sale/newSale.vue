<template>
  <!-- 填写销售计划单 -->
  <section ref="dialogue_box" id='dialogue_box'>
    <div class="fillIn-header">
      <h1>填写销售订单</h1>
      <el-tag size="mini">新建单据</el-tag>
    </div>
    <div ref='fillIn-body' id='fillIn-body' class="fillIn-body">
      <el-container>
        <el-main>
          <PurchasePlan
            :dtype="8"
            ref="childPlan"
            :uploaddata="uploadData"
            @wanglaiInfo="wanglaiInfos"
            @clearList="clearAllHasChoosedPro"
          ></PurchasePlan>
          <ProductTable
            ref="childTable"
            :status="'edit'"
            :tablelist="tableList"
            @deleteRow="deleRows"
            @hasSelectedRows="hasSelectedRow"
          ></ProductTable>
          <ProductInput
            v-show="wanglaiList.bw_id !=0 && wanglaiList.bw_id != ''"
            @productInfo="productInfo"
            :dtype="8"
            :bwid="wanglaiList.bw_id"
            :fanweic="fanwei_c"
            :fanweik="fanwei_k"
          ></ProductInput>
          <div class="caozuo">
            <el-button @click="sendDraft(1)">保存草稿</el-button>
            <el-button @click="sendDraft(2)">审核单据</el-button>
            <el-button @click="sendDraft(3)">退出</el-button>
          </div>

          <div class="fillIn-footer">
            <span>删除行：Alt + Del</span>
          </div>
        </el-main>
        <el-aside width="200px" style>
          <ProInfo ref="proinfo" :proinfo="proinfos"></ProInfo>
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
import { addCaogao, getCaogaoDetail } from "@/utils/api";
export default {
  name: "fillIn",
  components: {
    PurchasePlan,
    ProductTable,
    ProductInput,
    ProInfo
  },
  data() {
    return {
      container:{},
      proinfos: {},
      fanwei_c: [],
      fanwei_k: "",
      wanglaiList: {
        bw_id: 0
      },
      scrollDom: null,
      canPush: true,
      tableList: [],
      uploadData: {
        wanglai: "",
        bw_id: "", //往来抬头
        be_id4: "", //产品经理
        type: 8, //单据类型
        date: "", //单据日期
        beizhu: "",
        zhaiyao: "",
        psType: 1,
        saleType: 1,
        dc_id:''
      },
      cansubmit: false,
      changeList:true
    };
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScrolls);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrolls, true);
  },
  methods: {
    wanglaiInfos(value) {
      this.wanglaiList = value;
      this.fanwei_c = value.fanwei != "" ? value.fanwei.split(",") : [];
      this.fanwei_k = value.fanwei_c != "" ? value.fanwei_c : "";
    },
    checkSubmitFrom() {
      let res = true;
      if (
        this.$refs.childPlan.uploadData.bw_id != 0 &&
        this.$refs.childPlan.uploadData.bw_id != ""
      ) {
        let number = 1;
        this.$refs.childTable.tableData.some((item, index) => {
          if (item.shuliang == 0 || item.jiage == 0) {
            res = false;
            number == 1 && this.alertMsg(`第${index + 1}行数量或者金额出错，请检查后再提交`);
            ++number;
            return false;
          }
        });
      } else {
        this.alertMsg(`往来单位获取错误，请刷新后再试！`);
        res = false;
      }
      return res;
    },
    alertMsg(msg) {
      this.$message({
        type: "warning",
        message: msg
      });
    },
    deleRows(index) {
      this.tableList.splice(index, 1);
    },
    hasSelectedRow(val) {
      this.proinfos = val;
    },
    wanglaiInfo(value) {
      this.wanglaiList = value;
      this.fanwei_c = value.fanwei.split(",");
    },
    clearAllHasChoosedPro() {
      this.tableList = [];
    },
    checkArrIsSagle(value) {
      this.canPush = true;
      this.tableList.some(item => {
        if (item.bp_id == value.bp_id && item.psk_id == value.psk_id) {
          this.canPush = false;
        }
      });
    },
    productInfo(value) {
      this.checkArrIsSagle(value);
      value.shuliang = 0;
      let values = {
        ...value,
        shuliang: 0
      };
      if (!value.hasOwnProperty("jiage")) {
        var nvalues = {
          ...values,
          jiage: 0
        };
      }
      if (this.canPush) {
         this.tableList.push(nvalues);
      } else {
        this.$message({
          type: "warning",
          message: "请勿选择相同的药！"
        });
      }
    },
    sendDraft(type) {
      let pramas = {
        ...this.$refs.childPlan.uploadData,
        dc_id:this.dc_id,
        type: 8,
        list: JSON.stringify(this.$refs.childTable.tableData),
        heji_pre: this.$refs.childTable.sumPrices[
          this.$refs.childTable.sumPrices.length - 1
        ]
      };
      if (type == 1) {
        addCaogao({ danju_cao: JSON.stringify(pramas) }).then(res => {
          if (res.status == "success") {
            this.$message({
                type: "success",
                message: "草稿单据保存成功！"
              });
            this.clearAllHasChoosedPro();
          }
        });
      } else if (type == 2 && this.checkSubmitFrom()) {
        alert("可以直接提交");
      } else {
      }
    }
  },
  created() {
    if (this.$route.query.type == "caogao") {
      getCaogaoDetail({ dc_id:this.$route.query.dc_id})
        .then(res => {
          if (res.status == "success") {
            this.changeList = false
            this.tableList = res.caogao.list;
            delete res.caogao.list;
            this.dc_id = res.caogao.dc_id
            this.uploadData = res.caogao;
            this.wanglaiList.bw_id = this.uploadData.bw_id;
          }
        })
        .catch(res => {
          console.log(res);
        });
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
