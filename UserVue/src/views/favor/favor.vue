<template>
  <div class="car">
    <headers></headers>
    <div class="car1" style="justify-content: center">
        <div class="car5" style="width:80%">
            <div class="car7">
                <div class="car8" v-for="(item,index) in tableData" :key="index">
                    <div class="car9">
                        <div style="margin-top:20px">{{item.name}}</div>
                        <img @click="toInfo(item.carId)" style="width:100%;height:220px;margin-top:20px" :src="item.images.split(',')[0]">
                        <div class="car10">
                            <div class="car11" @click="removeCarFavor(item.id)">取消收藏</div>
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
  import {getCarFavorPage,removeCarFavor} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        user: {},
        tableData: [],
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
        handleCurrentChange(val) {
            this.pageNumber = val
            this.getCarListPage()
        },
        toInfo(id) {
          this.$router.push("/carInfo?id=" + id)
        },
        removeCarFavor(id) {
            removeCarFavor({ids: id}).then(res => {
                if (res.code == 1000) {
                    this.getCarFavorPage()
                }
            })
        },
        getCarFavorPage() {
          var param = {
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            userId: this.user.id
          }
          getCarFavorPage(param).then(res => {
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
      this.user = window.localStorage.getItem("user_info")
      this.getCarFavorPage()
    }
 }
</script>

<style scoped>
   @import url('../../assets/css/car.css');
</style>