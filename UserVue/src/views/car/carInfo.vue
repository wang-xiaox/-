<template>
  <div class="carInfo">
    <headers></headers>
    <div class="carInfo1">
        <div class="carInfo2">
            <el-carousel height="500px">
                <el-carousel-item v-for="(item,index) in info.images.split(',')" :key="index">
                    <img style="width:100%;height:100%" :src="item">
                </el-carousel-item>
            </el-carousel>
            <div class="carInfo3">
                车辆信息：
            </div>
            <div class="carInfo4">
                车辆名称：{{info.name}}
            </div>
            <div class="carInfo4">
                车辆类型：{{info.type}}
            </div>
            <div class="carInfo4">
                车辆颜色：{{info.color}}
            </div>
            <div class="carInfo4">
                车牌号：{{info.carNumber}}
            </div>
            <div class="carInfo4">
                上牌年份：{{info.year}}
            </div>
            <div class="carInfo4">
                小时单价：{{info.price}}
            </div>
            <div class="carInfo4">
                变速箱类型：{{info.trans}}
            </div>
            <div class="carInfo4">
                押金:{{info.deposit}}
            </div>
            <el-button @click="open()" icon="el-icon-sold-out" size="small" style="margin-top:20px;margin-left:20px" type="primary" plain>租赁</el-button>
            <el-button v-if="tofavor" @click="favor(info.id)" icon="el-icon-sold-out" size="small" style="margin-top:20px;margin-left:20px" type="primary" plain>收藏</el-button>
            <div class="carInfo3">
                车辆详情：
            </div>
            <div class="carInfo4" v-html="info.content">

            </div>
        </div>
    </div>
    <bottoms></bottoms>
    <el-dialog
    title="租赁"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>
        <div>姓名：</div>
        <el-input size="small" v-model="name" placeholder="姓名"></el-input>
        <div style="margin-top:20px">联系方式：</div>
        <el-input size="small" v-model="tel" placeholder="联系方式"></el-input>
        <div style="margin-top:20px">身份证号：</div>
        <el-input size="small" v-model="idNumber" placeholder="身份证号"></el-input>
        <div style="margin-top:20px">驾照：</div>
        <el-upload
            :file-list="fileList"
            ref="upload"
            :action="uploadImageUrl()"
            accept="image/*"
            :multiple="false"
            :limit="1"
            :before-upload="beforeAvatorUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-exceed="handleExceed"
            :on-success="handleAvatorSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog title="预览" :visible.sync="dialogVisibleUrl">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div style="margin-top:20px">押金：</div>
        <el-input size="small" v-model="info.deposit" placeholder="押金" disabled></el-input>
        <div style="margin-top:20px">租车时长:</div>
        <el-input size="small" type="number" v-model="duration" placeholder="租车时长"></el-input>
        <div style="margin-top:10px">
            金额：{{duration * info.price}}
        </div>
        <div style="margin-top:10px">
            支付方式：
            <el-radio v-model="pay" label="1">微信</el-radio>
            <el-radio v-model="pay" label="2">支付宝</el-radio>
        </div>
        <img style="width:300px;height:300px" v-if="pay == 1" src="../../assets/image/weixin.jpg">
        <img style="width:300px;height:300px" v-if="pay == 2" src="../../assets/image/zhifubao.jpg">
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getCarListById,saveCarOrder,saveCarFavor,getFavor} from '../../api/api'
  import {mixin} from "../../minix";
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    mixins: [mixin],
    data() {
      return{
          tofavor: true,
          user: {},
          id: "",
          info: {},
          dialogVisible: false,
          name: "",
          tel: "",
          idNumber: "",
          image: "",
          fileList: [],
          dialogImageUrl: '',
          dialogVisibleUrl: false,
          duration: "",
          pay: '1'
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
        favor(id) {
            var param = {
                carId: id
            }
            saveCarFavor(param).then(res => {
                if (res.code == 1000) {
                    this.$message({
                        message: '收藏成功',
                        type: 'sucess'
                    });
                    this.getFavor()
                }
            })
        },
        getFavor() {
            getFavor({userId: this.user.id,carId: this.id}).then(res => {
                if (res.code == 1000) {
                    this.tofavor = false
                } else {
                    this.tofavor = true
                }
            })
        },
        open() {
            this.dialogVisible = true
        },
        handleClose() {
            this.name = "",
            this.tel = "",
            this.idNumber = "",
            this.image = "",
            this.fileList = []
            this.dialogVisible = false
        },
        submit() {
            if (!this.name) {
                this.$message({
                    message: '请输入姓名',
                    type: 'warning'
                });
                return
            }
            if (!this.tel) {
                this.$message({
                    message: '请输入联系方式',
                    type: 'warning'
                });
                return
            }
            if (!this.idNumber) {
                this.$message({
                    message: '请输入身份证号',
                    type: 'warning'
                });
                return
            }
            if (!this.image) {
                this.$message({
                    message: '请上传驾驶证',
                    type: 'warning'
                });
                return
            }
            if (!this.duration) {
                this.$message({
                    message: '请输入租车时长',
                    type: 'warning'
                });
                return
            }
            var param = {
                carId: this.id,
                realName: this.name,
                tel: this.tel,
                idNumber: this.idNumber,
                image: this.image,
                loginAccount: this.user.loginAccount,
                deposit: this.info.deposit,
                durat: this.duration,
            }
            saveCarOrder(param).then(res => {
                if (res.code == 1000) {
                    this.$message({
                        message: '租赁成功，请前往车行确认',
                        type: 'success'
                    });
                    this.name = "",
                    this.tel = "",
                    this.idNumber = "",
                    this.image = "",
                    this.fileList = []
                    this.dialogVisible = false
                } else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            })
        },
        handleAvatorSuccess(res) {
            let _this = this;
            if(res.code == 1000){
                _this.$message({
                type: 'success',
                message: '上传成功!'
                });
                this.fileList.push({url:this.$store.state.HOST + res.message})
                this.image = this.$store.state.HOST + res.message
            }else{
                _this.$notify.error({
                    title: '错误',
                    message: res.message
                });
            }
        },
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleUrl = true;
        },
        getCarListById() {
            getCarListById({id: this.id}).then(res => {
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
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
      this.id = this.$route.query.id
      this.getCarListById()
      this.getFavor()
    }
 }
</script>

<style scoped>
   @import url('../../assets/css/carInfo.css');
   ::v-deep img {
    max-width: 100% !important;
   }
</style>
