<template>
  <!-- 填写采购计划单 -->
  <section>
    <div class="fillIn-header">
      <h1>填写采购计划单</h1>
      <el-tag size="mini">新建单据</el-tag>
    </div>
    <div class="fillIn-body">
      <PurchasePlan :dtype="1" ref="childPlan" :uploaddata="uploadData" @wanglaiInfo="wanglaiInfo"></PurchasePlan>
      <ProductTable ref="childTable" :status="'edit'" :tablelist="tableList"></ProductTable>
      <ProductInput @productInfo="productInfo" :bwid="wanglaiList.bw_id" :fanweic="fanwei_c" :fanweik="fanwei_k"></ProductInput>
      <div class="caozuo">
        <el-button @click="sendDraft(1)">保存草稿</el-button>
        <el-button @click="sendDraft(2)">审核单据</el-button>
        <el-button @click="quit">退出</el-button>
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
import ProductInput from "@/components/caigou/ProductInput";
import {addCaogao,getCaogaoDetail,insertData} from "@/utils/api";
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
      fanwei_k: "",
      wanglaiList: {
        bw_id: 0
      },
      dc_id:'',
      tableList: [],
      uploadData: {
        dc_id:'',
        wanglai: "",
        bw_id: "", //往来抬头
        be_id: "", //经手人
        be_id2: "", //制单人
        be_id3: "", //审核人
        be_id4: "", //产品经理
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
      this.fanwei_c =value.fanwei.length>1?value.fanwei.split(","):'';
      this.fanwei_k = value.fanwei_c;
    },
    productInfo(value) {
      this.tableList.push(value);
    },
    checkBuyData(){
           let res = true;
      if (
        this.$refs.childPlan.uploadData.bw_id != 0 &&
        this.$refs.childPlan.uploadData.bw_id != ""
      ) {
        let number = 1;
        this.$refs.childTable.tableData.some((item, index) => {
          if (item.shuliang == 0 || item.jiage == 0) {
            res = false;
            number == 1 && this.alertMsg(`第${index + 1}行数量或者单价出错，请检查后再提交`);
            ++number;
            return false;
          }
        });
      } else {
        this.alertMsg(`客户获取错误，请刷新后再试！`);
        res = false;
      }
      return res;
    },quit(){

    },
    sendDraft(type) {
        this.$refs.childTable.tableData.forEach(item=>{
            item.jine = item.shuliang * item.jiage
        })
        let pramas = {
          ...this.$refs.childPlan.uploadData,
          dc_id:this.dc_id,
          type:1,
          list: JSON.stringify(this.$refs.childTable.tableData),
          heji_pre: this.$refs.childTable.sumPrices[
            this.$refs.childTable.sumPrices.length - 1
          ]
        };
        type === 1 ? this.saveCaogao(pramas):this.submitForm(pramas);
    },
    alertMsg(msg) {
      this.$message({
        type: "warning",
        message: msg
      });
    },
    submitForm(pramas){
        if(this.checkBuyData()){
            insertData({danju:JSON.stringify(pramas)}).then(res=>{
              if(res.status == 'success'){
                  this.$message({
                      type: res.status,
                      message:'采购计划已进入山海内勤，请耐心等候'
                    })
                  this.$router.push('/danju')  
              }
            })
        };
    },
    saveCaogao(pramas) { //保存草稿
      addCaogao({ danju_cao: JSON.stringify(pramas)})
        .then(res => {
          if(res.status == "success") {
            this.$router.push('/caogao');
            this.$message({
              type: res.status,
              message: res.message
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCaogaoDet(dc_id) {
      getCaogaoDetail({dc_id: dc_id})
      .then(res => {
        if (res.status == "success") {
          this.tableList = res.caogao.list;
          delete res.caogao.list;
          this.uploadData = res.caogao;
          this.wanglaiList.bw_id = this.uploadData.bw_id;
        }
      })
      .catch(res => {
        console.log(res)
      })
    }
  },
  created() {
    if (this.$route.query.type == "caogao") {
      this.dc_id = this.$route.query.dc_id
      this.getCaogaoDet(this.$route.query.dc_id);
    } else {
      if (this.$route.query.di_id) {
        console.log(123);
        //uploadData
        //tableList
      }
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