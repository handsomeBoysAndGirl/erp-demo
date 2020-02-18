<template>
  <section>
    <Search :dtype="1" @search="search" @searchAll="searchAll"></Search>
    <DanjuTable :tablelist="danjuList" @showInfo="showInfo"></DanjuTable>
    <el-pagination background layout="prev, pager, next" :total="danjuList.length"></el-pagination>
  </section>
</template>

<script>
import Search from "@/components/caigou/Search";
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
      this.$axios
        .post("/api/danjuIndex")
        .then(res => {
          this.danjuList = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
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
        path: "/fillIn",
        query: {
          di_id: value.di_id
        }
      });
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