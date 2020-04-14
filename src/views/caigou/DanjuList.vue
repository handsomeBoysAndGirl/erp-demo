<template>
  <section>
    <Search :dtype="1" @search="search" @searchAll="searchAll"></Search>
    <DanjuTable :tablelist="danjuList" @showInfo="showInfo"></DanjuTable>
    <el-pagination background layout="prev, pager, next" :total="danjuList.length"></el-pagination>
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
      searchAllInfo: {}
    };
  },
  methods: {
    getDanjuList() {
      getDanju({type:1})
      .then(res => {
        console.log(res)
        this.danjuList = res.danjuIndex;
      })
      .catch(res => {
        console.log(res)
      })
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
      this.$router.push(`/info/${value.di_id}`);
      console.log(value);
    }
  },
  created() {
    this.getDanjuList();
  }
};
</script>

<style>
</style>