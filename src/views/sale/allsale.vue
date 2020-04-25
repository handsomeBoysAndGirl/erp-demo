<template>
  <section>
    <Search :dtype="8" @search="search" @searchAll="searchAll"></Search>
    <DanjuTable :tablelist="danjuList" @showInfo="showInfo"></DanjuTable>
    <el-pagination background layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="data1.page"
      :total="total"></el-pagination>
  </section>
</template>

<script>
import DanjuTable from "@/components/danju/danjuTable";
import Search from "@/components/caigou/Search";
import {getDanju} from "@/utils/api"
export default {
  name: "danju",
  components: {
    DanjuTable,
    Search
  },
  data() {
    return {
      danjuList: [],
      searchInfo: {},
      searchAllInfo: {},
      total:0,
      data1: {
        type:9,
        id:JSON.parse(localStorage.getItem('userInfo')).be_id,
        page: 1
      }
    };
  },
  methods: {
    getDanjuList(data) {
      getDanju(data)
      .then(res => {
        this.danjuList = res.danjuIndex.info;
        this.total = res.danjuIndex.count;
      })
      .catch(res => {
        console.log(res)
      })
    },
    search(value) {
      let datapra = {
        ...this.data1
      };
      if (value.date) {
        value.beginDate = value.date[0];
        value.endDate = value.date[1];
        delete value.date;
      }
      for(let i in value) {
        if (value[i]) {
          datapra[i] = value[i]
        }
      }
       this.getDanjuList(datapra);
    },
    searchAll(value) {
      let params = {
        ...this.data1
      }
      params.page = 1;
      this.$nextTick(()=>{
        this.getDanjuList(params)
      })
    },
    showInfo(value) {
      this.$router.push(`/info/${value.di_id}?type=8`);
    },
    handleCurrentChange(val){
      this.data1.page = val;
      this.getDanjuList(this.data1);
    }
  },
  created() {
    this.getDanjuList(this.data1);
  }
};
</script>

<style>
</style>