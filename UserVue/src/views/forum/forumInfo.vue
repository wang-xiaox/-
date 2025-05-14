<template>
  <div class="forumInfo">
    <headers></headers>
    <div class="forumInfo1">
        <div class="forumInfo2">
            <div class="forumInfo3" @click="addLiked">
                {{info.title}}<i title="点赞" style="margin-left:20px" class="el-icon-thumb"></i>({{info.liked}})
            </div>
            <div class="forumInfo4">
                发布人：{{info.createBy}} - 发布时间：{{info.createTime}}
            </div>
            <div class="forumInfo5" v-html="info.content">
                
            </div>
        </div>
        <div class="forumInfo2">
            <div class="forumInfo7">
                <el-input type="textarea" rows="7" style="width:95%" v-model="content" placeholder="请输入评论内容"></el-input>
                <el-button type="success" style="margin-top:20px" size="small" plain @click="submit">提交</el-button>
            </div>
            <div class="forumInfo6">
                评论列表:
            </div>
            <div class="forumInfo8" v-for="(item,index) in tableData">
                <div class="forumInfo9">
                    <img :src="$store.state.HOST + item.avatar"><div>{{item.userName}}</div>
                </div>
                <div style="margin-left:20px">{{item.content}}</div>
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
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getCarForumById,saveCarForumItem,getCarForumItemPage,addLiked} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        id: "",
        content: "",
        pageSize: 10,
        pageNumber: 1,
        total: 100,
        info: {},
        tableData: [],
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      addLiked() {
        addLiked({id: this.id}).then(res => {
          if (res.code == 1000) {
            this.getCarForumById()
          }
        })
      },
      getCarForumItemPage() {
        var param = {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          forumId: this.id
        }
        getCarForumItemPage(param).then(res => {
          if (res.code == 1000) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
        })
      },
      handleCurrentChange(val) {
        this.pageNumber = val
        this.getCarForumItemPage()
      },
      submit() {
          if (!this.content) {
            this.$message({
                message: '请输入评论内容',
                type: 'warning'
            });
            return
          }
          var param = {
            content: this.content,
            forumId: this.id
          }
          saveCarForumItem(param).then(res => {
            if (res.code == 1000) {
              this.$message({
                  message: '评论成功',
                  type: 'success'
              });
              this.getCarForumItemPage()
            }
          })
      },
      getCarForumById() {
        getCarForumById({id: this.id}).then(res => {
          if (res.code == 1000) {
            this.info = res.data
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
      this.id = this.$route.query.id
      this.getCarForumById()
      this.getCarForumItemPage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/forumInfo.css');
  ::v-deep img {
    max-width: 100% !important;
  }
</style>