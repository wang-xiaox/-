<template>
  <div class="forum">
    <headers></headers>
    <div class="forum1">
        <div class="forum2">
            <div class="forum3">
                <el-input size="small" style="margin-left:20px" v-model="name" placeholder="请输入论坛名称"></el-input>
                <el-button size="small" style="margin-left:20px" type="primary" plain @click="search">查询</el-button>
                <el-button size="small" style="margin-right:20px" type="success" plain @click="addForum">发布论坛</el-button>
            </div>
            <div class="forum4">
                <div class="forum5">车友论坛:</div>
                <div class="forum6" v-for="(item,index) in tableData" :key="index" @click="toInfo(item.id)">
                    {{index + 1}}.{{item.title}}
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
    <el-dialog
    title="发布论坛"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose">
    <span>
        <el-input v-model="forum.title" size="small" placeholder="请输入论坛标题"></el-input>
        <el-radio style="margin-top:20px" v-model="forum.type" label="0">公开</el-radio>
        <el-radio style="margin-top:20px" v-model="forum.type" label="1">私人</el-radio>
        <quill-editor style="margin-top:20px" ref="myQuillEditor" :options="editorOption"
        v-model="forum.content"/>
        <el-upload class="Quill-uploader" :show-file-list="false" accept="image/*" v-show="0" ref="updateUpload" :multiple="false" :action="uploadImageUrl()"
            :on-success="handleQillSuccess">
        </el-upload>
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
    </span>
    </el-dialog>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getCarForumPage,saveCarForum} from '../../api/api'
  import { mixin } from '../../minix/index';
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    mixins: [mixin],
    data() {
      return{
        name: "",
        tableData: [],
        pageSize: 10,
        pageNumber: 1,
        total: 100,
        dialogVisible: false,
        forum: {
            title: "",
            type: "0",
            content: "",
        },
        editorOption: {
          placeholder: "请输入论坛内容",
          modules: { 
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike"], 
                    ["blockquote", "code-block"], 
                    [{ header: 1 }, { header: 2 }], 
                    [{ list: "ordered" }, { list: "bullet" }], 
                    [{ script: "sub" }, { script: "super" }], 
                    [{ indent: "-1" }, { indent: "+1" }], 
                    [{ direction: "rtl" }], 
                    [{ size: ["small", false, "large", "huge"] }], 
                    [{ header: [1, 2, 3, 4, 5, 6, false] }], 
                    [{ color: [] }, { background: [] }], 
                    [{ font: [] }], [{ align: [] }], 
                    ["clean"], ["image"]
                ],
                handlers: {
                    'image': function ( value ) {
                        if ( value ) {
                            // 触发上传插件
                            document.querySelector('.Quill-uploader .el-upload__input').click()
                        } else {
                            this.quill.format( 'image', false );
                        }
                    }
                }
            },
            syntax: { 
                highlight: text => { 
                    return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方 
                }
            }
          }
        },
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      search() {
        this.pageNumber = 1
        this.getCarForumPage()
      },
      getCarForumPage() {
        var param = {
          title: this.name,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
        getCarForumPage(param).then(res => {
          if (res.code == 1000) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
        })
      },
      toInfo(id) {
        this.$router.push("/forumInfo?id=" + id)
      },
      handleCurrentChange(val) {
        this.pageNumber = val
        this.getCarForumPage()
      },
      addForum() {
          this.dialogVisible = true
      },
      handleClose() {
        this.forum = {
            title: "",
            type: "0",
            content: "",
        }
        this.dialogVisible = false
      },
      submit() {
        if (!this.forum.title) {
          this.$message({
            message: '请输入标题',
            type: 'warning'
          });
          return
        }
        if (!this.forum.content) {
          this.$message({
            message: '请输入内容',
            type: 'warning'
          });
          return
        }
        saveCarForum(this.forum).then(res => {
          if (res.code == 1000) {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.forum = {
              title: "",
              type: "0",
              content: "",
            }
            this.dialogVisible = false
            this.getCarForumPage()
          }
        })
        
      },
      handleQillSuccess(res){
            let _this = this;
            if(res.code == 1000){
                _this.$notify({
                    title: '上传成功',
                    type: 'success'
                });
                let imgurl = this.$store.state.configure.HOST + res.message
                let quill = this.$refs.myQuillEditor.quill
                let position = quill.getSelection().index
                quill.insertEmbed(position, 'image', imgurl)
                quill.setSelection(position + 1)
            }else{
                _this.$notify({
                    title: '上传失败',
                    type: 'error'
                });
            }
        },
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.getCarForumPage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/forum.css');
</style>