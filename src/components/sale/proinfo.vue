<template>
<el-collapse
    v-model="activeNames"
    @change="handleChange"
    :class="showbox ? 'activeTop' : ''"
  >
    <el-collapse-item
      title="药品信息"
      name="1"
      style="border-top:2px solid #409EFF;"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称:">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="规格:">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="厂家:">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="剂型:">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="销售基数:">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="当前库存:">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="采购价:">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item label="件装数量:">
          <span>{{ form.name }}</span>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item
      title="最近十次价格"
      name="2"
      style="border-top:2px solid #409EFF;"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="100">
        </el-table-column>
        <el-table-column prop="name" label="数量" width="50"> </el-table-column>
        <el-table-column prop="address" label="价格" width="50">
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  data() {
    return {
      showbox: false,
      activeNames: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "10",
          address: "40"
        },
        {
          date: "2016-05-02",
          name: "10",
          address: "40"
        },
        {
          date: "2016-05-02",
          name: "10",
          address: "40"
        },
        {
          date: "2016-05-02",
          name: "10",
          address: "40"
        }
      ]
    };
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll(event) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
      scrollTop >= 150 ? (this.showbox = true) : (this.showbox = false);
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px !important;
}
.activeTop {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
