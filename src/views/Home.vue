<template>
  <section>
    <el-container>
      <el-header>
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">采购</template>
            <el-menu-item index="/danju">采购计划单列表</el-menu-item>
            <el-menu-item index="/fillIn">填写采购计划单</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">销售</template>
            <el-menu-item index="/newsale">编辑销售订单</el-menu-item>
            <el-menu-item index="/allsale">销售单据一览</el-menu-item>
          </el-submenu>
          <el-menu-item index="/caogao">草稿箱</el-menu-item>
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">订单管理</a>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <div class="navbar clearfix">
          <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="item in levelList"
              :key="item.path"
              :to="item.path"
            >{{item.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view />
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: "1",
      levelList: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name.trim() !== "home") {
        matched = [{ path: "/", meta: { title: "首页" } }].concat(matched);
      }
      this.levelList = matched;
    }
  },
  created() {
    this.getBreadcrumb();
  }
};
</script>
<style scoped>
section .el-container .el-header {
  padding: 0;
}
.clearfix {
  margin-bottom: 15px;
}
</style>