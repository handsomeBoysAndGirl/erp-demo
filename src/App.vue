<template>
  <div id="app">
    <!-- <Header v-if="$route.meta.keepAlive" /> -->
    <router-view />
  </div>
</template>

<style>
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<script>
import Header from "@/components/common/header";
export default {
  components: {
    Header
  },
  data() {
    return {};
  },
  created() {
    console.log(2);
  }
};
</script>>


<style>
#app {
  margin: 0;
  padding: 0;
}
</style>