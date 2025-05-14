<template>
  <div class="index">
    <div class="index1">
      <headers></headers>
      <div class="index2">
        <div class="index3">
          欢迎使用汽车租赁系统,租在手里,赢在路上
        </div>
        <div class="index4">
          Welcome to use the Easy Car Rental System. Rent in your hands, win on the road. Easy Car Rental, we know you better than you do.
        </div>
        <div class="index5">
          <div class="index6" @click="toCar">
            <i class="el-icon-s-promotion"></i>汽车信息
          </div>
          <div class="index6" style="margin-left:20px" @click="toForum">
            <i class="el-icon-s-promotion"></i>汽车论坛
          </div>
        </div>
      </div>
    </div>
    <div class="index7">
      <div class="index8">
        <div class="index9">
          <div class="index10">
            <div>站内公告</div>
            <el-button size="small" type="primary" plain @click="toAnnouncement">查看更多</el-button>
          </div>
          <div class="index11" v-for="(item,index) in announcement" :key="index">
            <img src="../../assets/image/Frame 640.png">
            <div class="index12">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="index13">
      <div class="index14">
        <div class="index15">汽车信息Pick Your Car</div>
        <div class="index16">
          <div class="index17" v-for="(item,index) in car" :key="index" @click="toCarInfo(item.id)">
            <img style="width:100%;height:340px;border-radius:10px" :src="item.images.split(',')[0]">
            <div>车辆品牌：{{item.brand}}</div>
            <div>车辆名称：{{item.name}}</div>
            <div>上架时间：{{item.createTime}}</div>
          </div>
        </div>
        <div class="index18">
          <el-button size="small" type="success" plain @click="toCar()">查看更多</el-button>
        </div>
      </div>
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getCarAnnouncementFive,getCarListThree} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        announcement: [],
        car: [],
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      toCar() {
        this.$router.push("/car")
      },
      toCarInfo(id) {
        this.$router.push("/carInfo?id=" + id)
      },
      toForum() {
        this.$router.push("/forum")
      },
      toAnnouncement() {
        this.$router.push("/announcement")
      },
      getCarAnnouncementFive() {
        getCarAnnouncementFive().then(res => {
          if (res.code == 1000) {
            this.announcement = res.data
          }
        })
      },
      getCarListThree() {
        getCarListThree().then(res => {
          if (res.code == 1000) {
            this.car = res.data
            console.log(this.car[0].images.split(',')[0])
          }
        })
      }
    },
    created() {

    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.getCarAnnouncementFive()
      this.getCarListThree()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/index.css');
</style>
