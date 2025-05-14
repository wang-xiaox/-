<template>
  <div class="seek">
    <headers></headers>
    <div class="seek1">
        <div class="seek2">
            <div class="seek3">
                <div class="seek4" id="seek4">
                    <span v-for="(item,index) in items" :key="index">
                        <div v-if="item.type == 0" class="seek5">
                            <div>
                                <img style="width:40px;height:40px;border-radius:50%;margin-left:20px" :src="$store.state.HOST + item.avatar">
                            </div>
                            <div style="margin-left:20px">{{item.content}}</div>
                        </div>
                        <div v-else class="seek5" style="float:right;justify-content: flex-end;">
                            <div style="margin-left:20px">{{item.content}}</div>
                            <div>
                                <img style="width:40px;height:40px;border-radius:50%;margin-left:20px" :src="$store.state.HOST + item.avatar">
                            </div>
                        </div>
                    </span>
                </div>
                <el-input  type="textarea" rows="7" v-model="content" placeholder="请输入对话内容"></el-input>
                <el-button  @click="save()" style="margin-top:20px;float:right;" type="warning" plain size="small">发送</el-button>
            </div>
        </div>
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getCarSeekPage,saveCarSeek} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        user: {},
        items: [],
        content: "",
        interval: null,
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
        save() {
            if (!this.content) {
              this.$message({
                message: '请输入咨询内容',
                type: 'warning'
              });
              return
            }
            var param = {
              type: 0,
              content: this.content
            }
            saveCarSeek(param).then(res => {
              if (res.code == 1000) {
                this.$message({
                  message: '咨询成功',
                  type: 'success'
                });
                this.content = ""
                this.getCarSeekPage()
              }
            })
        },
        getCarSeekPage() {
          getCarSeekPage().then(res => {
            if (res.code == 1000) {
              this.items = res.data
              this.scrollToBottom()
            }
          })
        },
        scrollToBottom(){
            this.$nextTick(()=>{
                let chat = this.$el.querySelector("#seek4")
                chat.scrollTop = chat.scrollHeight
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
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
      this.getCarSeekPage()
      if (!this.interval) {
          var that = this
          this.interval = setInterval(function() {
              that.getCarSeekPage()
          },5000)
      }
    },
    destroyed() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/seek.css');
</style>