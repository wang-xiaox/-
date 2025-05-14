<template>
  <div class="header">
    <img style="width:170px" src="../assets/image/logo.png">
    <div class="header1">
      <div @click="toPage('index')" :class="$route.path == '/'?'active':''" class="menu-item">首页</div>
      <div @click="toPage('car')" :class="$route.path == '/car'?'active':''" class="menu-item">汽车信息</div>
      <div @click="toPage('forum')" :class="$route.path == '/forum'?'active':''" class="menu-item">汽车论坛</div>
      <div @click="toPage('announcement')" :class="$route.path == '/announcement'?'active':''" class="menu-item">站内公告</div>
      <div @click="toPage('seek')" :class="$route.path == '/seek'?'active':''" class="menu-item">在线咨询</div>
      <div @click="toPage('favor')" :class="$route.path == '/favor'?'active':''" class="menu-item">我的收藏</div>
      <div @click="toPage('manage')" :class="$route.path == '/manage'?'active':''" class="menu-item">后台管理</div>
    </div>
    <div class="header2">
      <div class="header3" @click="toCenter">
        {{user.userName}}
      </div>
      <div class="header4" @click="loginOut">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        user: {}
      }
    },
    methods: {
      toCenter() {
        this.$router.push("/center")
      },
      toPage(name) {
        if (name == "index") {
          this.$router.push("/")
        } else if (name == "car") {
          this.$router.push("/car")
        } else if (name == "seek") {
          this.$router.push("/seek")
        } else if (name == "forum") {
          this.$router.push("/forum")
        } else if (name == "manage") {
          window.open("http://localhost:3000")
        } else if (name == "announcement") {
          this.$router.push("/announcement")
        } else if (name == "favor") {
          this.$router.push("/favor")
        }
      },
      loginOut() {
        this.$store.dispatch('logout').then(() => {
          window.localStorage.removeItem("user_info")
          window.localStorage.removeItem("user_token")
          this.$message({
              message: '退出成功',
              type: 'success'
          });
          setTimeout(function(){
              window.location.reload()
          },1000)
        })
      }
    },
    created() {
     
    },
    mounted() {
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
    }
 }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: '黑体';
  }
  .header1 {
    display: flex;
  }
  .active {
    color: #00816F;
  }
  .menu-item {
    font-size: 14px;
    margin-left: 30px;
    cursor: pointer;
  }
  .header2 {
    display: flex;
  }
  .header3 {
    width: 130px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FEA501;
    border-radius: 10px;
    margin-right: 20px;
    cursor: pointer;
  }
  .header4 {
    width: 130px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FEA501;
    border-radius: 10px;
    cursor: pointer;
  }
</style>