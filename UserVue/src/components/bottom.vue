<template>
  <div>
    <div class="bottom">
      <div class="bottom1">
        <div class="bottom2" @click="toPage('index')">
          <i class="el-icon-house"></i><span style="margin-left:10px">首页</span>
        </div>
        <div class="bottom3" @click="toPage('car')">
          <i class="el-icon-monitor"></i><span style="margin-left:10px">汽车信息</span>
        </div>
        <div class="bottom2" @click="toPage('forum')">
          <i class="el-icon-position"></i><span style="margin-left:10px">汽车论坛</span>
        </div>
        <div class="bottom3" @click="toPage('announcement')">
          <i class="el-icon-postcard"></i><span style="margin-left:10px">站内公告</span>
        </div>
        <div class="bottom2" @click="toPage('seek')">
          <i class="el-icon-connection"></i><span style="margin-left:10px">在线咨询</span>
        </div>
        <div class="bottom3" @click="toPage('manage')">
          <i class="el-icon-data-line"></i><span style="margin-left:10px">后台管理</span>
        </div>
      </div>
    </div>
    <div class="bottom11">
      Copyright © 2024.Company name All rights reserved.
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        
      }
    },
    methods: {
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
        }
      },
    },
 }
</script>

<style scoped>
  .bottom {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    background-color: #161D27;
    align-items: center;
    font-family: '黑体';
  }
  .bottom1 {
    width: 80%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .bottom2 {
    width: 23%;
    height: 80px;
    background-color: #F79F1A;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    color: #ffffff;
  }
  .bottom2 {
    width: 30%;
    height: 80px;
    background-color: #F79F1A;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    color: #ffffff;
  }
  .bottom3 {
    width: 30%;
    height: 80px;
    background-color: #00816F;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    color: #ffffff;
  }
  .bottom11 {
    height: 40px;
    text-align: center;
    font-size: 20px;
  }
</style>