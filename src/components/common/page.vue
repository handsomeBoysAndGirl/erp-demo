<template>
  <div class="block" >
 <el-pagination
      :small="pageslarge"
      @current-change="handleCurrentChange"
      :page-size="50"
      :pager-count = 5
      layout="prev, pager,next, jumper"
      :total="totalPage">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props:{
      totalPage:Number,
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('getPagesVal',val)
      }
    },
    data() {
      return {
        pageslarge:true,
      };
    }
  }
</script>