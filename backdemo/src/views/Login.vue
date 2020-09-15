<template>
  <el-row class="login-bg">
    <el-col :span="8" class="login-box">
      <h3 class="login-title">小U商城管理系统</h3>
      <el-form :model="forminfo" ref="forminfo" :rules="rules">
        <el-form-item>
          <el-input v-model="forminfo.username" placeholder="请输入帐号">
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="forminfo.password" show-password placeholder="请输入密码">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="login-btn">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      forminfo: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        password: [{ required: true, message: "必填！", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
      ...mapActions({
          login:"user/login"
      }),
    onSubmit() {
        this.$refs.forminfo.validate(valid=>{
           if(valid){
              this.login(this.forminfo)
           }
         })
    }
  },
  components: {}
};
</script>
<style scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/bg_img.jpg");
  background-size: 100% 100%;
}
.login-box h3 {
  margin-bottom: 30px;
  text-align: center;
  line-height: 40px;
}
.login-box {
  height: 400px;
  background-color: #fff;
  padding: 30px 40px;
  border: 1px solid #000;
  border-radius: 20px;
}
.login-btn {
  display: block;
  width: 100%;
}
</style>