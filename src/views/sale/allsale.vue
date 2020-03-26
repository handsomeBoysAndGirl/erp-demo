<template>
  <section>
    <Search :dtype="2" @search="search" @searchAll="searchAll"></Search>
    <DanjuTable :tablelist="danjuList" @showInfo="showInfo"></DanjuTable>
    <el-pagination background layout="prev, pager, next" :total="danjuList.length"></el-pagination>
  </section>
</template>

<script>
import Search from "@/components/caigou/Search";
import {getAllSale} from "@/utils/api"
import DanjuTable from "@/components/danju/danjuTable";
export default {
  name: "caogao",
  components: {
    DanjuTable,
    Search
  },
  data() {
    return {
      danjuList: [],
      searchInfo: {},
      searchAllInfo: {}
    };
  },
  methods: {
    getDanjuList() {
      getAllSale().then(res=>{ this.danjuList = res}).catch(err=>{console.log(err)})
    },
    search(value) {
      this.searchInfo = value;
      console.log(value);
    },
    searchAll(value) {
      this.searchAllInfo = value;
      console.log(value);
    },
    showInfo(value) {
      this.$router.push({
        path: "/newsale",
        query: {
          di_id: value.di_id
        }
      });
    }
  },
  created() {
    this.getDanjuList();
  }
};
</script>

<style>
</style>