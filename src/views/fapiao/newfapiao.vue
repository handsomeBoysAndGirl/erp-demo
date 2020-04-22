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
              :disabled="bwid == ''"
              v-model="nowtimeLine"
              class="picker_filter"
              size="mini"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>

          <div class="codelist" style="margin-top:15px;display:flex;flex-direction:column;justify-content:left">
            <div  v-for="item in danhao" :key="item.di_id" @click="checkedChange(item)">
              <el-link type="primary" style="margin-bottom:20px" >{{item.name}}</el-link>
              <el-link disabled icon='date' style="margin-bottom:20px;margin-left:10px" >{{item.date}}</el-link>
            </div>  
          </div>
        </el-aside>
        <el-main>
         <FpList :tableData ="tableDatas" @ChildrenChange='changeDetailVal'  />
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
import {wanglai,getFpList} from "@/utils/api";
import FpList from '@/components/danju/fapiaoList'
export default {
  components:{
    FpList
  },
  data() {
    return {
      search: {
        name: ""
      },
      bwid:'',
      nowtimeLine:'',
      startTime:'',
      endtTime:'',
      checkList:[],
      danhao:[],
      allDetailList:[],
      tableDatas: {}
    };
  },
  watch:{
     nowtimeLine(val){
       if(val != null){
          this.startTime =   this.$tools.formatDate(this.nowtimeLine[0],this);
          this.endtTime =   this.$tools.formatDate(this.nowtimeLine[0],this);
          this.searchfp();
       }
     },
     names(val){
       if(val === '')this.bwid='' ;
     }
  },
  mounted(){
    this.$tools.FinanceDeal(3.141592654);
  },
  methods: {
    //子组件值改变
    changeDetailVal(val){
        this.danhao.forEach((item,key)=>{
          if(val.name == item.name){
            this.danhao[key].list = val.list
        }})
    },
    checkedChange(val){
       this.tableDatas = val
    },
    querySearch(queryString, cb) {
      wanglai({ type: this.dtype,name: queryString })
        .then(res => {
          res.forEach(item => {
            item.value = `${item.name}-${item.suoxie}`;
          });
          cb(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelect(item) {
      this.bwid = item.bw_id
      this.searchfp();
    },
    searchfp(){
      if(this.bw_id !=''){
        getFpList({'bw_id':this.bwid,'startTime':`${this.startTime}`,'endTime':`${this.endtTime}`}).then(res=>{
          this.danhao = res.map(item=>{
               return {
                 'di_id':item.di_id,
                 'name':item.danhao,
                 'list':item.list,
                 'date':item.date
               }
             })
            this.danhao =this.addChecked(this.danhao);
        })
      }else{
        this.$message({
          message: '警告:请先选择往来单位',
          type: 'warning'
        });
      }
    },
    addChecked(arr){
      arr.forEach((e,k)=>{
          e.list.forEach(item=>{
            item['checked'] = false
        })
      });
      return arr;
    }
  },
  computed:{
    names(){
      return this.search.name
    }
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
