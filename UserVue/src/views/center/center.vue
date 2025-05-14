<template>
  <div class="center1">
    <headers></headers>
    <div class="center2">
        <div class="center3">
            <el-tabs tab-position="left">
                <el-tab-pane label="个人信息" class="center4">
                    <el-upload style="align-self: center;"
                        ref="upload"
                        :action="uploadImageUrl()"
                        :show-file-list="false"
                        :before-upload="beforeAvatorUpload"
                        :on-success="handleAvatorSuccess"
                        accept="image/*"
                        >
                        <img title="点击更换头像" class="center4-image" style="width:300px;height:300px;border-radius:50%" :src="$store.state.HOST + user.avatar">
                    </el-upload>
                    <el-input size="small" style="margin-top:30px" v-model="user.loginAccount" disabled></el-input>
                    <el-input size="small" style="margin-top:15px" v-model="user.userName" placeholder="请输入用户名"></el-input>
                    <el-input size="small" style="margin-top:15px" v-model="user.tel" placeholder="请输入联系电话"></el-input>
                    <el-select size="small" style="margin-top:15px" v-model="user.sex" placeholder="性别">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                    <el-input size="small" style="margin-top:15px" v-model="user.email" placeholder="请输入邮箱"></el-input>
                    <div style="margin-top:15px" class="center5">
                        <el-button size="small" type="warning" plain @click="saveUser">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改密码">
                    <el-input type="password" size="small" style="margin-top:15px" v-model="oldPassword" placeholder="请输入旧密码"></el-input>
                    <el-input type="password" size="small" style="margin-top:15px" v-model="newPassword" placeholder="请输入新密码"></el-input>
                    <el-input type="password" size="small" style="margin-top:15px" v-model="password" placeholder="请输入确认密码"></el-input>
                    <div style="margin-top:15px" class="center5">
                        <el-button size="small" type="warning" plain @click="changePassword">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="租赁订单">
                    <el-select size="small" v-model="carState" placeholder="请选择状态">
                        <el-option
                        label="未还"
                        value="0">
                        </el-option>
                        <el-option
                        label="以还"
                        value="1">
                        </el-option>
                    </el-select>
                    <el-button size="small" style="margin-left:20px" type="primary" plain @click="searchCar()">查询</el-button>
                    <div class="car7">
                        <div class="car8" v-for="(item,index) in tableCarData">
                            <div class="car9">
                                <div style="margin-top:20px">{{item.name}} - {{item.state == 0?'未还':'以还'}}</div>
                                <img @click="openCarInfo(index)" style="width:100%;height:220px;margin-top:20px" :src="item.images.split(',')[0]">
                                <div class="car10">
                                    <div class="car11" @click="openGz(item.orderNumber,item.name,item.brand)">故障申报</div>
                                    <div class="car11" @click="openCar(item.orderNumber)">还车</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                        style="margin-bottom:40px"
                        background
                        :page-size="pageSizeCar"
                        layout="prev, pager, next"
                        @current-change="handleCurrentChangeCar"
                        :total="totalCar">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="故障申报">
                    <div class="car7">
                        <div class="car8" v-for="(item,index) in tableGZData">
                            <div class="car9">
                                <div style="margin-top:20px">{{item.name}} -{{item.state == 0?'未处理':'已处理'}}</div>
                                <img style="width:100%;height:220px;margin-top:20px" :src="item.images.split(',')[0]">
                                <div class="car10">
                                    <div class="car11" @click="openGzInfo(index)">详情</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                        style="margin-bottom:40px"
                        background
                        :page-size="pageSizeGz"
                        layout="prev, pager, next"
                        @current-change="handleCurrentChangeGz"
                        :total="totalGz">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="罚款信息">
                    <div class="car7">
                        <div class="car8" v-for="(item,index) in tableFKData">
                            <div class="car9">
                                <div style="margin-top:20px">{{item.name}} -{{item.state == 0?"未支付":"已支付"}}</div>
                                <img style="width:100%;height:220px;margin-top:20px" :src="item.images.split(',')[0]">
                                <div class="car10">
                                    <div class="car11" @click="openFkInfo(index)">详情</div>
                                    <div class="car11" v-if="item.state == 0" @click="openFk(index)">支付</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                        style="margin-bottom:40px"
                        background
                        :page-size="pageSizeFk"
                        layout="prev, pager, next"
                        @current-change="handleCurrentChangeFk"
                        :total="totalFk">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="我的发布">
                    <div class="forum6 luntan" v-for="(item,index) in tableFbData">
                       <div @click="toFBinfo(item.id)"> {{index + 1}}.{{item.title}}</div>
                       <el-button type="danger" size="small" plain @click="deleteFB(item.id)">删除</el-button>
                    </div>
                    <el-pagination
                        style="margin-bottom:40px"
                        background
                        :page-size="pageSizeFb"
                        layout="prev, pager, next"
                        @current-change="handleCurrentChangeFb"
                        :total="totalFb">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <bottoms></bottoms>
    <el-dialog
    title="租赁详情"
    :visible.sync="dialogVisible1"
    width="30%"
    :before-close="handleClose1">
    <span>
        <div style="margin-top:10px">订单编号：{{car.orderNumber}}</div>
        <div style="margin-top:10px">车辆名称：{{car.name}}</div>
        <div style="margin-top:10px">车辆类型：{{car.type}}</div>
        <div style="margin-top:10px">车辆品牌：{{car.brand}}</div>
        <div style="margin-top:10px">车牌号：{{car.carNumber}}</div>
        <div style="margin-top:10px">小时单价：{{car.price}}</div>
        <div style="margin-top:10px">租车时间：{{car.createTime}}</div>
        <div style="margin-top:10px">用户账号：{{car.loginAccount}}</div>
        <div style="margin-top:10px">姓名：{{car.realName}}</div>
        <div style="margin-top:10px">联系方式：{{car.tel}}</div>
        <div style="margin-top:10px">身份证号：{{car.idNumber}}</div>
        <div style="margin-top:10px">状态：{{car.state == 0?'未还':'以还'}}</div>
        <div style="margin-top:10px">还车时间：{{car.returnTime}}</div>
        <div style="margin-top:10px">金额：{{car.money}}</div>
        <div style="margin-top:10px">审核：{{car.bound == 1?'未审核':'已审核'}}</div>
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose1">关闭</el-button>
    </span>
    </el-dialog>

    <el-dialog
    title="故障申报"
    :visible.sync="dialogVisible2"
    width="30%"
    :before-close="handleClose2">
    <span>
        <div style="margin-top:20px">订单编号：</div>
        <el-input size="small" v-model="guzhang.orderNumber" disabled></el-input>
        <div style="margin-top:20px">车辆名称：</div>
        <el-input size="small" v-model="guzhang.name" disabled></el-input>
        <div style="margin-top:20px">车辆品牌：</div>
        <el-input size="small" v-model="guzhang.brand" disabled></el-input>
        <div style="margin-top:20px">请上传故障图片：</div>
        <el-upload
            :file-list="fileList"
            ref="upload"
            :action="uploadImageUrl()"
            accept="image/*"
            :multiple="false"
            :limit="5"
            :before-upload="beforeAvatorUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-exceed="handleExceed"
            :on-success="handleAvatorSuccessImage"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog title="预览" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div style="margin-top:20px">故障内容：</div>
        <el-input size="small"  type="textarea" v-model="guzhang.content" placeholder="请输入故障内容"></el-input>
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose2">关闭</el-button>
        <el-button size="small" type="primary" @click="submitGz">确定</el-button>
    </span>
    </el-dialog>

    <el-dialog
    title="故障详情"
    :visible.sync="dialogVisible3"
    width="30%"
    :before-close="handleClose3">
    <span>
        <div style="margin-top:20px">故障状态：{{guzhang.state == 0?"未处理":"已处理"}}</div>
        <div style="margin-top:20px">订单编号：</div>
        <el-input size="small" v-model="guzhang.orderNumber" disabled></el-input>
        <div style="margin-top:20px">车辆名称：</div>
        <el-input size="small" v-model="guzhang.name" disabled></el-input>
        <div style="margin-top:20px">车辆品牌：</div>
        <el-input size="small" v-model="guzhang.brand" disabled></el-input>
        <div style="margin-top:20px">请上传故障图片：</div>
        <el-upload
            disabled
            :file-list="fileList"
            ref="upload"
            :action="uploadImageUrl()"
            accept="image/*"
            :multiple="false"
            :limit="5"
            :before-upload="beforeAvatorUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-exceed="handleExceed"
            :on-success="handleAvatorSuccessImage"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog title="预览" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div style="margin-top:20px">故障内容：</div>
        <el-input disabled size="small"  type="textarea" v-model="guzhang.content" placeholder="请输入故障内容"></el-input>
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose3">关闭</el-button>
    </span>
    </el-dialog>

    <el-dialog
    title="罚款详情"
    :visible.sync="dialogVisible4"
    width="30%"
    :before-close="handleClose4">
    <span>
        <div style="margin-top:10px">订单编号：{{fakuan.orderNumber}}</div>
        <div style="margin-top:10px">车辆品牌：{{fakuan.brand}}</div>
        <div style="margin-top:10px">车牌号：{{fakuan.carNumber}}</div>
        <div style="margin-top:10px">罚款类型：{{fakuan.type}}</div>
        <div style="margin-top:10px">罚款金额：{{fakuan.money}}</div>
        <div style="margin-top:10px">罚款内容：{{fakuan.content}}</div>
        <div style="margin-top:10px">罚款时间：{{fakuan.fineTime}}</div>
        <div style="margin-top:10px">支付状态：{{fakuan.state == 0?'未支付':'已支付'}}</div>
        <div style="margin-top:10px">罚款状态：{{fakuan.fineState == 0?'未处理':'已处理'}}</div>
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose4">关闭</el-button>
    </span>
    </el-dialog>

    <el-dialog
    title="还车"
    :visible.sync="dialogVisible5"
    width="30%"
    :before-close="handleClose5">
    <span>
        <div style="margin-top:10px">订单编号：{{huanche.orderNumber}}</div>
        <div style="margin-top:10px">支付金额：{{huanche.money}}</div>
        <div style="margin-top:10px">
            支付方式：
            <el-radio v-model="pay" label="1">微信</el-radio>
            <el-radio v-model="pay" label="2">支付宝</el-radio>
        </div>
        <img style="width:300px;height:300px" v-if="pay == 1" src="../../assets/image/weixin.jpg">
        <img style="width:300px;height:300px" v-if="pay == 2" src="../../assets/image/zhifubao.jpg">
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose5">关闭</el-button>
        <el-button size="small" type="primary" @click="submitCar(huanche.id)">确认支付</el-button>
    </span>
    </el-dialog>
    <el-dialog
    title="罚款"
    :visible.sync="dialogVisible6"
    width="30%"
    :before-close="handleClose6">
    <span>
        <div style="margin-top:10px">订单编号：{{fakuan.orderNumber}}</div>
        <div style="margin-top:10px">罚款金额：{{fakuan.money}}</div>
        <div style="margin-top:10px">
            支付方式：
            <el-radio v-model="pay" label="1">微信</el-radio>
            <el-radio v-model="pay" label="2">支付宝</el-radio>
        </div>
        <img style="width:300px;height:300px" v-if="pay == 1" src="../../assets/image/weixin.jpg">
        <img style="width:300px;height:300px" v-if="pay == 2" src="../../assets/image/zhifubao.jpg">
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose6">关闭</el-button>
        <el-button size="small" type="primary" @click="submitFk()">确认支付</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {removeCarForum,getCarForumPage,getCarFinePage,editUser,changePassword,getCarOrderPage,saveCarFault,getCarReturnByOrder,editCarReturn,getCarFaultPage, editCarFine} from '../../api/api'
  import {mixin} from "../../minix";
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    mixins: [mixin],
    data() {
      return{
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible5: false,
        dialogVisible6: false,
        car: {},
        carState: "",
        guzhang: {
            orderNumber: "",
            content: "",
            name: "",
            images: "",
        },
        fakuan: {},
        huanche: {},
        pay: "1",

        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,

        user: {},
        oldPassword: "",
        newPassword: "",
        password: "",

        pageSizeCar: 10,
        pageNumberCar: 1,
        totalCar: 100,
        tableCarData: [],
        state1: "",

        pageSizeGz: 10,
        pageNumberGz: 1,
        totalGz: 100,
        tableGZData: [],

        pageSizeFk: 1,
        pageNumberFk: 12,
        totalFk: 100,
        tableFKData: [],

        pageSizeFb: 10,
        pageNumberFb: 1,
        totalFb: 100,
        tableFbData: [],
        value: "",
      }
    },
    components: {
        headers,
        bottoms
    },
    methods: {
        deleteFB(id) {
            removeCarForum({id:id}).then(res => {
                if (res.code == 1000) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getCarForumPage()
                }
            })
        },
        toFBinfo(id) {
            this.$router.push("/forumInfo?id="+ id)
        },
        getCarForumPage() {
            var param = {
                userId: this.user.id,
                pageSize: this.pageSizeFb,
                pageNumber: this.pageNumberFb
            }
            getCarForumPage(param).then(res => {
                if (res.code == 1000) {
                    this.tableFbData = res.data.records
                    this.totalFb = res.data.total
                }
            })
        },
        getCarFinePage() {
            var param = {
                loginAccount: this.user.loginAccount,
                pageSize: this.pageSizeCar,
                pageNumber: this.pageNumberCar,
            }
            getCarFinePage(param).then(res => {
                if (res.code == 1000) {
                    this.tableFKData = res.data.records
                    this.totalFk = res.data.total
                }
            })
        },
        getCarFaultPage() {
            var param = {
                userId: this.user.id,
                pageSize: this.pageSizeGz,
                pageNumber: this.pageNumberGz,
            }
            getCarFaultPage(param).then(res => {
                if (res.code == 1000) {
                    this.tableGZData = res.data.records
                    this.totalGz = res.data.total
                }
            })
        },
        searchCar() {
            this.pageNumberCar = 1
            this.getCarOrderPage()
        },
        getCarOrderPage() {
            var param = {
                loginAccount: this.user.loginAccount,
                pageSize: this.pageSizeCar,
                pageNumber: this.pageNumberCar,
                state: this.carState
            }
            getCarOrderPage(param).then(res => {
                if (res.code == 1000) {
                    this.tableCarData = res.data.records
                    this.totalCar = res.data.total
                }
            })
        },
        openCarInfo(index) {
            this.car = this.tableCarData[index]
            this.dialogVisible1 = true
        },
        handleClose1() {
            this.car = {}
            this.dialogVisible1 = false
        },
        openGz(orderNumber,name,brand) {
            this.guzhang.orderNumber = orderNumber
            this.guzhang.name = name
            this.guzhang.brand = brand
            this.dialogVisible2 = true
        },
        handleClose2() {
            this.car = {}
            this.guzhang = {}
            this.fileList = []
            this.dialogVisible2 = false
        },
        submitGz() {
            if (!this.guzhang.content) {
              this.$message({
                message: '请输入故障内容',
                type: 'warning'
              });
              return
            }
            var file = []
            for(let i = 0;i < this.fileList.length;i++) {
                file.push(this.fileList[i].url)
            }
            this.guzhang.images = file.join(",")
            if (!this.guzhang.images) {
              this.$message({
                message: '请上传故障图片',
                type: 'warning'
              });
              return
            }
            saveCarFault(this.guzhang).then(res => {
                if (res.code == 1000) {
                    this.guzhang = {
                        orderNumber: "",
                        content: "",
                        name: "",
                        images: "",
                    }
                    this.fileList = []
                    this.dialogVisible2 = false
                    this.$message({
                        message: '申报故障成功',
                        type: 'success'
                    });
                    this.getCarFaultPage()
                }
            })
        },
        openGzInfo(index) {
            this.guzhang = this.tableGZData[index]
            var img = this.guzhang.images.split(",")
            for(let i = 0;i<img.length;i++) {
                var param = {
                    url: img[i]
                }
                this.fileList.push(param)
            }
            this.dialogVisible3 = true
        },
        handleClose3() {
            this.guzhang = {}
            this.fileList = []
            this.dialogVisible3 = false
        },
        openFkInfo(index) {
            this.fakuan = this.tableFKData[index]
            this.dialogVisible4 = true
        },
        handleClose4() {
            this.fakuan = {}
            this.dialogVisible4 = false
        },
        openCar(orderNumber) {
            getCarReturnByOrder({orderNumber: orderNumber}).then(res => {
                if (res.code == 1000) {
                   if (res.data) {
                        this.huanche = res.data
                        if (this.huanche.state == 1) {
                            this.$message({
                                message: '该订单车辆已归还',
                                type: 'warning'
                            });
                            return
                        }
                        this.dialogVisible5 = true
                   }
                }
            })
        },
        submitCar (id) {
            var param = {
                id: id,
                state: 1,
            }
            editCarReturn(param).then(res => {
                if (res.code == 1000) {
                    this.pay = "1"
                    this.dialogVisible5 = false
                    this.$message({
                        message: '支付成功，已还车',
                        type: 'success'
                    });
                    this.huanche = {}
                }
            })
        },
        handleClose5() {
            this.pay = "1"
            this.huanche = {}
            this.dialogVisible5 = false
        },
        openFk(index) {
            this.fakuan = this.tableFKData[index]
            this.dialogVisible6 = true
        },
        submitFk () {
            var param = {
                id: this.fakuan.id,
                state: 1
            }
            editCarFine(param).then(res => {
                if (res.code == 1000) {
                    this.pay = "1"
                    this.dialogVisible6 = false
                    this.$message({
                        message: '支付成功',
                        type: 'success'
                    });
                    this.fakuan = {}
                    this.getCarFinePage()
                }
            })

        },
        handleClose6() {
            this.fakuan = {}
            this.pat = "1"
            this.dialogVisible6 = false
        },
        handleAvatorSuccessImage(res) {
            let _this = this;
            if(res.code == 1000){
                _this.$message({
                type: 'success',
                message: '上传成功!'
                });
                this.fileList.push({url:this.$store.state.HOST + res.message})
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
            this.dialogVisible = true;
        },
        handleCurrentChangeCar(val) {
            this.pageNumberCar = val
        },
        handleCurrentChangeGz(val) {
            this.pageNumberGz = val
        },
        handleCurrentChangeFk(val) {
            this.pageNumberFk = val
        },
        handleCurrentChangeFb(val) {
            this.pageNumberFb = val
        },
        handleAvatorSuccess(res){
        let _this = this;
        if(res.code == 1000){
            _this.$message({
              type: 'success',
              message: '上传成功!'
            });
            this.user.avatar = res.message
        }else{
          _this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      },
      getUserById() {
        var user = window.localStorage.getItem("user_info")
        this.user = JSON.parse(user)
        this.user.sex = this.user.sex + ""
      },
      saveUser() {
        if (!this.user.userName) {
          this.$message({
              message: '请输入用户名',
              type: 'warning'
          });
          return
        }
        if (!this.user.tel) {
          this.$message({
              message: '请输入联系方式',
              type: 'warning'
          });
          return
        }
        if (!this.user.sex) {
          this.$message({
              message: '请选择性别',
              type: 'warning'
          });
          return
        }
        if (!this.user.email) {
          this.$message({
              message: '请输入邮箱',
              type: 'warning'
          });
          return
        }
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式
        if (!regex.test(this.user.email)) {
            this.$message({
                message: '请输入正确的邮箱格式',
                type: 'warning'
            });
            return;
        }
        var param = {
          id: this.user.id,
          userName: this.user.userName,
          tel: this.user.tel,
          sex: this.user.sex,
          email: this.user.email,
          avatar: this.user.avatar,
        }
        editUser(param).then(res => {
          if (res.code == 1000) {
            this.$message({
                message: '保存成功',
                type: 'success'
            });
            window.localStorage.setItem("user_info",JSON.stringify(this.user))
          }
        })
      },
      changePassword() {
        if (!this.newPassword) {
          this.$message({
              message: '请输入新密码',
              type: 'warning'
          });
          return
        }
        if (!this.oldPassword) {
          this.$message({
              message: '请输入旧密码',
              type: 'warning'
          });
          return
        }
        if (!this.password) {
          this.$message({
              message: '请输入确认密码',
              type: 'warning'
          });
          return
        }
        if (this.password != this.newPassword) {
          this.$message({
              message: '旧密码和确认密码不一致',
              type: 'warning'
          });
          return
        }
        var param = {
          id: this.user.id,
          password: this.oldPassword,
          newPassword: this.newPassword
        }
        changePassword(param).then(res => {
          if (res.code == 1000) {
            this.$message({
                message: '保存成功,请重新登录',
                type: 'success'
            });
            window.localStorage.removeItem("user_token")
            window.localStorage.removeItem("user_info")
            location.reload()
          } else {
            this.$message({
                message: res.message,
                type: 'warning'
            });
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
      this.user = JSON.parse(window.localStorage.getItem("usr_info"))
      this.getUserById()
      this.getCarOrderPage()
      this.getCarFaultPage()
      this.getCarFinePage()
      this.getCarForumPage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/center.css');
</style>
