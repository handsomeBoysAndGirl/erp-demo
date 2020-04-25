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
import {getCaogao} from "@/utils/api";
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
        getCaogao()
        .then(res => {
          console.log(res);
          this.danjuList = res.caogao
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
   
      if(value.type == 1){
          this.$router.push({
            path: "/fillIn",
            query: {
              dc_id: value.dc_id,
              type: 'caogao'
            }
          });
      }else{
        this.$router.push({
            path: "/newsale",
            query: {
              dc_id: value.dc_id,
              type: 'caogao'
            }
          });
      }
    }
  },
  created() {
    this.getDanjuList();
  }
};
</script>

<style>
</style>