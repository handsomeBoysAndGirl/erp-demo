<template>
  <div>
    <button @click="testReq">测试请求</button>
  </div>
</template>

<script>
export default {
  name: "test",
  methods: {
    testReq: function() {
      this.$axios
        .post("/api/test")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>