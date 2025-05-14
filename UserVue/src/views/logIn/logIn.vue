<template>
  <div class="login">
    <div class="login1">
        <div class="login2">
            <div class="login3">
                <img src="../../assets/image/logo.png">
                <div class="login4">欢迎使用汽车租赁系统</div>
                <div class="login5">Welcome to the Easy Car Rental License System</div>
                <div class="login6">汽车租赁系统,租在手里,赢在路上</div>
                <div style="margin-top:40px">登录账号：</div>
                <el-input v-model="loginAccount" placeholder="请输入登录账号"></el-input>
                <div style="margin-top:20px">登录密码：</div>
                <el-input v-model="password" type="password" placeholder="请输入登录密码"></el-input>
                <div class="login7">
                    <div class="login8" @click="login">
                        登 录
                    </div>
                </div>
                <div class="login9">————————— Or —————————</div>
                <div class="login7">
                    <div class="login10" @click="toRegister">
                        <i class="el-icon-mobile-phone"></i>注 册
                    </div>
                </div>
                <div class="login7">
                    <div class="login10" @click="toForget">
                        <i class="el-icon-key"></i>忘记密码？
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="login1">
        <img style="width:75%;height:95%;border-radius:20px" src="../../assets/image/Art.png">
    </div>
  </div>
</template>

<script>
  import {login,getUser} from '../../api/api'
  export default {
    data() {
      return{
        loginAccount: "",
        password: "",
      }
    },
    methods: {
        toRegister() {
          this.$router.push("/register")
        },
        toForget() {
          this.$router.push("/forget")
        },
        login() {
            if(!this.loginAccount) {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                });
                return;
            }
            if(!this.password) {
                this.$message({
                    message: '请输入密码',
                    type: 'warning'
                });
                return;
            }
            var params = {
                loginAccount: this.loginAccount,
                password: this.password
            }
            login(params).then(res => {
                if(res.code == 1000) {
                    this.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    var that = this
                    var token = res.data.token
                    window.localStorage.setItem("user_token",token)
                    this.getUserInfo()
                    setTimeout(function() {
                        that.$router.push("/")
                    },500)
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        getUserInfo() {
            getUser().then(res => {
                if(res.code == 1000) {
                    window.localStorage.setItem("user_info",JSON.stringify(res.data))
                }
            })
        },
    },
    created() {

    },
    mounted() {

    }
 }
</script>

<style scoped>
  @import url('../../assets/css/login.css');
</style>
