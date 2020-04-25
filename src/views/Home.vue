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
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">销售</template>
            <el-menu-item index="/saleList">销售单据一览</el-menu-item>
            <el-menu-item index="/newsale">编辑销售计划单</el-menu-item>
          </el-submenu>
          <el-menu-item index="/caogao">草稿箱</el-menu-item>
           <el-submenu index="3">
            <template slot="title">发票任务</template>
            <el-menu-item index="/fapiao">发票任务一览</el-menu-item>
            <el-menu-item index="/newfapiao">新建发票任务</el-menu-item>
          </el-submenu>
          <el-menu-item index="/stock">库存查询</el-menu-item>
          <el-menu-item index="6" style="float:right">
            <el-tooltip class="item" effect="dark" content="个人资料" placement="top-end">
              <a href="#" target="_blank">唐文件</a>
            </el-tooltip>
          </el-menu-item>
          <el-menu-item index="5" style="float:right">
            <el-popover placement="bottom" width="100" trigger="hover">
              <div>
                <ul>
                  <li class="news">
                    <!-- 库存预警转向库存查询 -->
                    <div>
                       <i class="icon el-icon-warning"></i>
                        <span>库存预警</span> 
                    </div>
                    <div>1个</div>
                  </li>
                  <li class="news">
                     <!-- 待发货转向销售单一览 -->
                    <div><i class="icon el-icon-sell"></i>
                    <span>待发货</span> </div>
                    <div>2个</div>
                    </li>
                  <li class="news">
                    <div><i class="icon el-icon-money"></i> 
                    <!-- 待发货转向钱包-->
                    <span>财务处理</span></div>
                    <div>23个</div>
                  </li>
                </ul>
              </div>
              <el-button slot="reference" style="background:none;border:none">
                <i class="el-icon-message-solid"></i>
                <el-badge
                  is-dot
                  class="item"
                  style="width:3px;height:3px;position:relative;bottom:18px;right:9px"
                ></el-badge>
              </el-button>
            </el-popover>
          </el-menu-item>
          <el-menu-item index="/money" style="float:right">
            <el-tooltip class="item" effect="dark" content="钱包" placement="top-end">
              <a href="#">
                <i class="el-icon-s-goods"></i>
              </a>
            </el-tooltip>
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
      levelList: [],
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

.news {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #EEEEEE;
  cursor:pointer;
}

.icon {
  margin-right:10px;
}
</style>