<template>
  <div class="announcement">
    <headers></headers>
    <div class="announcement1">
        <div class="announcement2">
            <div class="announcement3">
                <el-input size="small" style="margin-left:20px" v-model="name" placeholder="请输入公告标题"></el-input>
                <el-button @click="search" size="small" style="margin-left:20px;margin-right:20px" type="primary" plain>查询</el-button>
            </div>
            <div class="announcement4">
                <div class="announcement5">站内公告：</div>
                <div class="announcement6" v-for="(item,index) in tableData" @click="toInfo(item.id)">
                    <div class="announcement7">
                        <img style="width:100%;height:100%" :src="$store.state.HOST + item.image">
                    </div>
                    <div class="announcement8">
                        <div class="announcement9">{{item.title}}</div>
                        <div class="announcement10">{{item.descs}}</div>
                    </div>
                </div>
                <el-pagination
                style="margin-bottom:10px"
                background
                :page-size="pageSize"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getCarAnnouncementPage} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        name: "",
        type: "",
        tableData: [],
        pageSize: 10,
        pageNumber: 1,
        total: 100,
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      search() {
        this.pageNumber = 1
        this.getCarAnnouncementPage()
      },
      getCarAnnouncementPage() {
        var param = {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          title: this.name
        }
        getCarAnnouncementPage(param).then(res => {
          if (res.code == 1000) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
        })
      },
      handleCurrentChange(val) {
        this.pageNumber = val
        this.getCarAnnouncementPage()
      },
      toInfo(id) {
        this.$router.push("/announcementInfo?id=" + id)
      }
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.getCarAnnouncementPage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/announcement.css');
</style>