<template>
  <div class="login">
    <div class="login1">
        <div class="login2">
            <div class="login3">
                <img src="../../assets/image/logo.png">
                <div class="login4">欢迎使用汽车租赁系统</div>
                <div class="login5">Welcome to the Easy Car Rental License System</div>
                <div class="login6">汽车租赁系统,租在手里,赢在路上</div>
                <el-input style="margin-top:20px" v-model="loginAccount" placeholder="请输入登录账号"></el-input>
                <el-input style="margin-top:20px" v-model="password" type="password" placeholder="请输入登录密码"></el-input>
                <el-input style="margin-top:20px" v-model="userName" placeholder="请输入用户名"></el-input>
                <el-input style="margin-top:20px" v-model="email" placeholder="请输入邮箱"></el-input>
                <el-input style="margin-top:20px" v-model="tel" placeholder="请输入联系方式"></el-input>
                <div class="login7">
                    <div class="login8" @click="saveUser">
                        注 册
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="login1">
        <img style="width:75%;height:95%;border-radius:20px" src="../../assets/image/Art (1).png">
    </div>
  </div>
</template>

<script>
  import {saveUser} from '../../api/api'
  export default {
    data() {
      return{
        loginAccount: "",
        password: "",
        userName: "",
        type: "1",
        email: "",
        tel: "",
      }
    },
    methods: {
        saveUser() {
            if(!this.loginAccount) {
                this.$message({
                    message: '请输入登录账号',
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
            if(!this.userName) {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                });
                return;
            }
            if(!this.email) {
              this.$message({
                  message: '请输入邮箱',
                  type: 'warning'
              });
              return;
          }
            var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式
            if (!regex.test(this.email)) {
                this.$message({
                    message: '请输入正确的邮箱格式',
                    type: 'warning'
                });
                return;
            }
            if(!this.tel) {
                this.$message({
                    message: '请输入联系方式',
                    type: 'warning'
                });
                return;
            }
            var param = {
                loginAccount: this.loginAccount,
                password: this.password,
                userName: this.userName,
                userType: this.type,
                email: this.email,
                tel: this.tel,
            }
            saveUser(param).then(res => {
                if (res.code == 1000) {
                    this.$message({
                        message: '注册成功，即将为您跳转到登录页面',
                        type: 'success'
                    });
                    var that = this
                    setTimeout(function() {
                        that.$router.push("/login")
                    },500)
                } else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            })
        }
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
