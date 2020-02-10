<template>
  <div class="login">
    <LoginHeader>
      <el-form :model="form" ref="ruleForm" label-position="left" label-width="0px" slot="container">
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <!-- username -->
        <el-form-item prop="name" 
              :rules="[
                  { required: true, message: '请输入账号', trigger: 'blur' }
              ]">
          <el-input type="text" v-model="form.name" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
      

      
        <!-- password -->
        <el-form-item 
          prop="pass"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]">
          <el-input type="password" v-model="form.pass" @keyup.enter.native="onSubmit" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>

        <!-- 登录button -->
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script>
  import LoginHeader from "./LoginHeader.vue";
  import {apiLogin}  from '@/utils/api'
  export default {
    name: "login",
    data() {
      return {
        form: {
          name: '',
          pass: ''
        }
      }
    },
    methods: {
      onSubmit() {
         apiLogin({
            name: this.form.name,
            pass: this.form.pass
          }).then(res=>{
            console.log(res)
            if(res.code == 1){
              this.afterlogin(res)
            }
          })
      },
      afterlogin(data){
        console.log(data)
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
          this.$message({
            type: "success",
            message: `欢迎您，${data.name}!`,
            duration: 3000
          });
        this.$router.replace({ path: "/" });
      }
    },
    created() {},
    components: {
      LoginHeader
    }
  }
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  i {
    font-size: 14px;
    margin-left: 8px;
  }

  .forget {
    float: right;
  }
</style>