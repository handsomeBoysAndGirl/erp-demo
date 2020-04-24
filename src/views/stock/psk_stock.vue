<template>
  <div class="bg">
    <div class="search_component">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item clearable label="药品类型">
          <el-select v-model="searchs.gsp" placeholder="请选择">
            <el-option
              v-for="item in enums.gsp"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item clearable label="药品剂型">
          <el-select v-model="searchs.jx" placeholder="请选择">
            <el-option
              v-for="item in enums.jx"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item clearable label="产品经理">
          <el-select v-model="searchs.pro" placeholder="请选择">
            <el-option
              v-for="item in enums.pro"
              :key="item.be_id"
              :label="item.name"
              :value="item.be_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名(关键字)">
          <el-input style="width:240px" v-model="searchs.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="厂家(关键字)">
          <el-input style="width:240px" v-model="searchs.factory" clearable></el-input>
        </el-form-item>

        <el-form-item label="排序方式">
          <el-select v-model="searchs.order" placeholder="请选择">
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
      <el-table :data="tableData" style="width: 100%" max-height="500">
        <el-table-column fixed type="index" width="50"></el-table-column>
        <el-table-column prop="bwName" label="最后养护" width="100"></el-table-column>
        <el-table-column prop="type" label="产品经理" width="120"></el-table-column>
        <el-table-column prop="be_id1Name" label="商品名" width="120"></el-table-column>
        <el-table-column prop="dateline1" label="类型" width="150"></el-table-column>
        <el-table-column prop="be_id2Name" label="产品信息" width="120"></el-table-column>
        <el-table-column prop="dateline2" label="厂家" width="120"></el-table-column>
        <el-table-column prop="jine" label="批次" width="120"></el-table-column>
        <el-table-column prop="status" label="生产日期" width="120"></el-table-column>
        <el-table-column prop="zip" label="有效期" width="120"></el-table-column>
        <el-table-column prop="zip" label="数量" width="120"></el-table-column>
        <el-table-column prop="zip" label="单位" width="120"></el-table-column>
        <el-table-column prop="zip" label="成本" width="120"></el-table-column>
        <el-table-column prop="zip" label="金额" width="120"></el-table-column>
      </el-table>
      <Pages class="pages" @getPagesVal='newPages' v-on:getPagesVal="5" :totalPage="allPages" />
    </div>
  </div>
</template>

<script>
import Pages from "@/components/common/page.vue";
import { allFapiao,enums,getAllStock } from "@/utils/api";
export default {
  components: {
    Pages
  },
  data() {
    return {
      paixuType:'',
      tableData: [],
      searchs:{
          name:'',
          factory:'',
          gsp:'',
          jx:'',
          order:'',
          pro:'',
          page:1
      },
      allPages:10,
      enums:{

      },
      options: [{
          value: "0",
          label: "商品名正序"
        },
        {
          value: "1",
          label: "数量正序"
        },
        {
          value: "2",
          label: "数量倒序"
        }
      ],
      value: ""
    };
  },
  methods: {
    getallList() {
      allFapiao().then(res => {
        console.log(res);
        this.tableData = res;
      });
    },
    searchAll() {
        let newSearch =  {name:'',factory:'',gsp:'',jx:'',order:0,pro:'',page:1}
         getAllStock(newSearch).then(res=>{
             if(res.status === 'success'){
                 this.tableData =res.data
             }   
        })
    },
    search() {
        getAllStock(this.searchs).then(res=>{
             if(res.status === 'success'){
                 this.tableData =res.data
             }   
        })
    },
    //页数变化
    newPages(val){
        this.searchs.page = val  
        this.search();
    }
  },
  created(){
    this.searchs.order = this.options[0].value
    enums().then(res=>{
       if(res.status == 'success'){
           this.enums = res.enumsInfo
           window.localStorage.setItem('enums',JSON.stringify(res.enumsInfo))
           return  getAllStock(this.searchs)
       }
    })
    
      
  }
};
</script>


<style>
.el-form-item {
  margin-right: 60px;
}
.search_component,
.table {
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
  margin-top: 50px;
  height: 100%;
  border-top: 3px solid #409eff;
  flex-direction: column;
}

.pages {
  margin-top: 20px;
}
</style>