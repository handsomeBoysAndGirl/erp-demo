<template>
  <section>
      <div class="login">
        <div class="logo-box">
            <img src="./../assets/logo.png" alt="" class="logo">
        </div>

        <div class="content">
            <h1>登录</h1>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户">
                    <el-input class="input" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input class="input" v-model="form.pass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
      </div>
  </section>
</template>

<script>
export default {
    name: "login",
    data(){
        return {
            form: {
                name: '',
                pass: ''
            }
        }
    },
    methods:{
        onSubmit() {

        }
    },
    created(){}
}
</script>

<style scoped>
    .login {
        width: 60%;
        display: flex;
        height: 300px;
        margin: 150px auto;
        padding: 100px 0;
        border: 1px solid salmon;
        background: salmon;
    }
    .logo-box,.content {
        height: 300px;
        padding: 5px 50px;
    }
    .logo-box{
        width: 40%;
        border-radius: 2px;
        /* background: red; */
        box-shadow: inset  -2px 0 0 rgba( 255, 255, 250, 0.6), 
            inset -5px 0 0 rgba( 0, 0, 0, 0.1);
    }
    .content{
        width: 60%;
        /* background: green; */
    }
    .logo-box .logo {
        width: 100%;
        height: 100%;
        margin: auto;
    }
    .login .content .input>>>input {
        background: transparent;
        border-bottom: 1px solid #DCDFE6; 
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
    }
</style>
