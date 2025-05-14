<template>
<div>
  <el-dialog title="编辑汽车归还" width="40%" :destroy-on-close="true" :visible.sync="updateVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                订单编号:
                </span>
            <div style="width:100%">
                <el-form-item prop="orderNumber" style="margin-bottom:0">
                    <el-select @change="changeOrder" size="mini" v-model="form.orderNumber" placeholder="请选择订单">
                        <el-option v-for="(item,index) in order" :label="item.orderNumber" :value="item.orderNumber"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                汽车名称:
                </span>
            <div style="width:100%">
                <el-form-item prop="name" style="margin-bottom:0">
                    <el-input disableddisabled v-model="form.name" size="mini" placeholder="请输入汽车名称" autocomplete="off"></el-input>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                汽车品牌:
                </span>
            <div style="width:100%">
                <el-form-item prop="brand" style="margin-bottom:0">
                    <el-input disabled v-model="form.brand" size="mini" placeholder="请输入汽车品牌" autocomplete="off"></el-input>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                汽车类型:
                </span>
            <div style="width:100%">
                <el-form-item prop="type" style="margin-bottom:0">
                    <el-input disabled v-model="form.type" size="mini" placeholder="请输入汽车类型" autocomplete="off"></el-input>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                牌照:
                </span>
            <div style="width:100%">
                <el-form-item prop="carNumber" style="margin-bottom:0">
                    <el-input disabled v-model="form.carNumber" size="mini" placeholder="请输入牌照" autocomplete="off"></el-input>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                小时单价:
                </span>
            <div style="width:100%">
                <el-form-item prop="price" style="margin-bottom:0">
                    <el-input disabled v-model="form.price" size="mini" placeholder="请输入小时单价" autocomplete="off"></el-input>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">还车时间:</span>
            <div style="width:100%">
                <el-form-item prop="returnTime" style="margin-bottom:0">
                    <el-date-picker size="mini"
                    v-model="form.returnTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="还车时间">
                    </el-date-picker>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                租车时长:
                </span>
            <div style="width:100%">
                <el-form-item prop="time" style="margin-bottom:0">
                    <el-input type="number" v-model="form.time" size="mini" placeholder="请输入租车时长" autocomplete="off"></el-input>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                金额:
                </span>
            <div style="width:100%">
                <el-form-item prop="money" style="margin-bottom:0">
                    <el-input type="number" v-model="form.money" size="mini" placeholder="请输入金额" autocomplete="off"></el-input>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                状态:
                </span>
            <div style="width:100%">
                <el-form-item prop="state" style="margin-bottom:0">
                    <el-radio-group style="margin-top:1px;height:40px;display:flex;align-items: center" v-model="form.state">
                        <el-radio label="0">未支付</el-radio>
                        <el-radio label="1">已支付</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      <el-button size="mini" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import {editCarReturn,getCarReturnById,getCarOrderList} from '../../../api/api'
  export default {
    data() {
      return{
        order: [],
        formLabelWidth: '80px',
        form: {
          orderNumber: "",
          carId: "",
          returnTime: "",
          time: "",
          money: "",
          name: "",
          brand: "",
          type: "",
          carNumber: "",
          price: "",
          state: "",
        },
        rules: {
          orderNumber: [
            { required: true, message: '请选择订单编号', trigger: 'blur' },
          ],
          returnTime: [
            { required: true, message: '请输入还车时间', trigger: 'blur' },
          ],
          time: [
            { required: true, message: '请输入租车时长', trigger: 'blur' },
          ],
          money: [
            { required: true, message: '请输入金额', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入汽车名称', trigger: 'blur' },
          ],
          brand: [
            { required: true, message: '请输入汽车品牌', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请输入汽车类型', trigger: 'blur' },
          ],
          carNumber: [
            { required: true, message: '请输入牌照', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入小时单价', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['updateVisible','updateId'],
    methods: {
      changeOrder(val) {
          if (val) {
              for(let i = 0;i < this.order.length;i++) {
                  var item = this.order[i]
                  if(val == item.orderNumber) {
                      this.form.carId = item.carId
                      this.form.name = item.name
                      this.form.brand = item.brand
                      this.form.type = item.type
                      this.form.carNumber = item.carNumber
                      this.form.price = item.price
                  }
              }
          }
      },
      getCarOrderList() {
          getCarOrderList().then(res => {
              if (res.code == 1000) {
                  this.order = res.data
              }
          })
      },
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            editCarReturn(this.form).then(res => {
              if(res.code == 1000) {
                this.$notify.success({
                  title: '成功',
                  message: "保存成功"
                });
                this.handleClose();
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.message
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      handleClose() {
        this.$emit("updateFalse")
      },
     
    },
    created() {
     
    },
    mounted() {
      this.getCarOrderList()
    },
    watch: {
      updateId(newVal) {
        if(newVal) {
          getCarReturnById({id:newVal}).then(res => {
            if(res.code == 1000) {
              this.form = res.data
              this.form.state = res.data.state + ""
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              });
            }
          })
        }
        
      }
    }
 }
</script>

<style lang=scss scoped>
  .el-col {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 24px
  }
  .search-title {
      font-family: '黑体';
      float: right;
      white-space: nowrap;
      font-size: 14px;
      width: 84px;
      text-align: right;
  }
  .el-tree {
      border: 1px solid #BDC1C9;
  }
</style>