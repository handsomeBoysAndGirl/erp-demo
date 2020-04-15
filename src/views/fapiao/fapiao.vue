<template>
  <div class="bg">
    <div class="search_component">
      <el-form :inline="true" class="demo-form-inline">
      
        <el-form-item label="往来单位：">
          <el-autocomplete
            class="inline-input"
            :fetch-suggestions="querySearch"
            value-key="name"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="单据日期：">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="开票状态：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="支付状态">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="发票类型">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">按条件搜索</el-button>
          <el-button @click="searchAll">所有</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table">
             <el-table
    :data="tableData"
    style="width: 100%"
    max-height="500">
  
    <el-table-column
      fixed
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="bwName"
      label="往来单位"
      width="300">
    </el-table-column>
    <el-table-column
      prop="type"
      label="发票类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="be_id1Name"
      label="创建人	"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dateline1"
      label="创建时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="be_id2Name"
      label="审核人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dateline2"
      label="审核时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="jine"
      label="合计金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="支付状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="开票状态"
      width="120">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          撤回
        </el-button>

          <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          查看详情
        </el-button>
      </template>
    </el-table-column>

  </el-table>
  
       <Pages class="pages" v-on:getPagesVal="5" :totalPage="100" />
    </div>
  </div>
</template>

<script>
import Pages from '@/components/common/page.vue'
import {allFapiao} from '@/utils/api'
export default {
    components:{
        Pages
    },
  data() {
    return {
         tableData: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕" 
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      value: ""
    };
  },
  methods:{
    getallList(){
      allFapiao().then(res=>{
        console.log(res)
        this.tableData = res
      })
    },
      searchAll(){

      },
      search(){

      },
      querySearch(){

      },
      handleSelect(){

      }
  },
  created(){
    this.getallList();
  }
};
</script>


<style>
.el-form-item {
    margin-right:60px;
}
.search_component,.table {
  padding: 20px;
  width: 95%;
  height: 100px;
  border: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: 0.2s;
  margin: 0 auto;
}

.table {
    margin-top:50px;
    height:100%;
    border-top:3px solid #409EFF;
    flex-direction: column;
}

.pages {
    margin-top:20px;
}
</style>