<template>
  <div class="car">
    <headers></headers>
    <div class="car1">
        <div class="car2">
            <div class="car3">
                <div style="color:#90A3BF;margin-top:20px">汽车类型：</div>
                <div class="car4" @click="selectType('')" style="margin-top:20px" ><img style="width:50px;margin-right:10px" src="../../assets/image/汽车.png">全部</div>
                <div class="car4" @click="selectType(item.name)" style="margin-top:20px" v-for="(item,index) in type" :key="index"><img style="width:50px;margin-right:10px" src="../../assets/image/汽车.png">{{item.name}}</div>
            </div>
        </div>
        <div class="car5">
            <div class="car6">
                <el-input size="small" v-model="name" style="margin-left:20px" placeholder="请输入汽车名称"></el-input>
                <el-input size="small" v-model="brand" style="margin-left:20px" placeholder="请输入汽车品牌"></el-input>
                <el-button size="small" type="primary" style="margin-left:20px;margin-right:20px" plain @click="search">搜索</el-button>
            </div>
            <div class="car7">
                <div class="car8" v-for="(item,index) in tableData" :key="index">
                    <div class="car9">
                        <div style="margin-top:20px">{{item.name}}</div>
                        <img style="width:100%;height:220px;margin-top:20px" :src="item.images.split(',')[0]">
                        <div class="car10">
                            <div>租金：{{item.price}}￥/小时</div>
                            <div class="car11" @click="toInfo(item.id)">租 凭</div>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination
                style="margin-bottom:40px"
                background
                :page-size="pageSize"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
        </div>
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getCarTypeList,getCarListPage} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        tableData: [],
        type: [],
        sType: "",
        name: "",
        brand: "",
        pageSize: 12,
        pageNumber: 1,
        total: 100
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
        search() {
          this.pageNumber = 1
          this.getCarListPage()
        },
        selectType(name) {
          this.sType = name
          this.getCarListPage()
        },
        handleCurrentChange(val) {
            this.pageNumber = val
            this.getCarListPage()
        },
        toInfo(id) {
          this.$router.push("/carInfo?id=" + id)
        },
        getCarTypeList() {
          getCarTypeList().then(res => {
            if(res.code == 1000) {
              this.type = res.data
            }
          })
        },
        getCarListPage() {
          var param = {
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            type: this.sType,
            state: 0,
            name: this.name,
            brand: this.brand
          }
          getCarListPage(param).then(res => {
            if (res.code == 1000) {
              this.tableData = res.data.records
              this.total = res.data.total
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
      this.getCarTypeList()
      this.getCarListPage()
    }
 }
</script>

<style scoped>
   @import url('../../assets/css/car.css');
</style>