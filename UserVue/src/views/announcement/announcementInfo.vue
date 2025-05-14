<template>
  <div class="forumInfo">
    <headers></headers>
    <div class="forumInfo1">
        <div class="forumInfo2">
            <div class="forumInfo3" @click="addAnnLiked">
                {{info.title}}<i title="点赞" style="margin-left:20px" class="el-icon-thumb"></i>({{info.liked}})
            </div>
            <div class="forumInfo4">
                发布人：{{info.createBy}} - 发布时间：{{info.createTime}}
            </div>
            <div class="forumInfo5" v-html="info.content">
            </div>
        </div>
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getCarAnnouncementById,addAnnLiked} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        id: "",
        info: {},
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      addAnnLiked() {
        addAnnLiked({id: this.id}).then(res => {
          if (res.code == 1000) {
            this.getCarAnnouncementById()
          }
        })
      },
      getCarAnnouncementById() {
        getCarAnnouncementById({id: this.id}).then(res => {
          if (res.code == 1000) {
            this.info = res.data
          }
        })
      },
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.id = this.$route.query.id
      console.log(this.id)
      this.getCarAnnouncementById()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/forumInfo.css');
  ::v-deep img {
    max-width: 100% !important;
  }
</style>