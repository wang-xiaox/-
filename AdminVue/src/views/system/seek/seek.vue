<template>
  <div class="_seek">
      <div class="search-table">
        <div class="search">
            <el-row :gutter="10" style="padding:10px">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">咨询人:</span>
                    <el-input
                        style="margin-top:10px"
                        size="mini"
                        placeholder="请输入咨询人"
                        v-model="search.createBy">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-search" type="primary" @click="searchPage">查询</el-button>
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-refresh" @click="refresh">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table">
            <el-row style="padding-top:10px;margin-left:10px">
                <el-button type="danger" :disabled="update.length <= 0 ?true:false" size="mini" icon="el-icon-delete" plain @click="deleteDataBtn">删除</el-button>
            </el-row>
            <el-table
            v-loading="loading"
            :data="tableData"
            :header-cell-style="{
              'color': '#4A2B90',
              'background-color': '#ECE9F4',
            }"
            :row-style="{
              'color': '#888897',
              'font-size': '15px',
              'font-family':'黑体',
              'white-space': 'nowrap'
            }"
            @selection-change="handleSelectionChange"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="咨询人"
              >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="时间"
              >
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              >
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              >
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="updateData(scope.row.userId)">回复</el-button>
                <el-popconfirm
                  style="margin-left:5px"
                  confirm-button-text='确认'
                  cancel-button-text='取消'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确认删除选中的数据？"
                  @confirm="deleteDate(scope.row.id)"
                >
                  <el-button size="mini" slot="reference" type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="search.pageSize"
            :current-page="search.pageNumber"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
          </div>
        </div>
        <el-dialog
        title="回复"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>
            <el-input type="textarea" rows="7" v-model="form.content" placeholder="请输入咨询内容"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="handleClose">取 消</el-button>
            <el-button size="mini" type="primary" @click="submit">确 定</el-button>
        </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
  import {getCarSeekPage,removeCarSeek,saveCarSeek} from '../../../api/api' 
  export default {
    data() {
      return{
        loading: true,
        update: [],
        remove: [],
        updateId: "",
        dialogVisible: false,
        search: {
            userId: "",
            createBy: "",
            type: 0,
            pageNumber: 1,
            pageSize:10
        },
        form: {
            content: "",
            type: 1,
            userId: ""
        },
        total: 0,
        tableData: []
      }
    },
    components: {
    },
    methods: {
      handleClose() {
          this.form = {
            content: "",
            type: 1,
            userId: ""
          }
          this.dialogVisible = false
      },
      submit() {
          if (!this.form.content) {
            this.$message({
              message: '请输入咨询内容',
              type: 'warning'
            });
            return
          }
          saveCarSeek(this.form).then(res => {
              if (res.code == 1000) {
                  this.$message({
                    message: '回复成功',
                    type: 'success'
                  });
                  this.form = {
                    content: "",
                    type: 1,
                    userId: ""
                  }
                  this.dialogVisible = false
                  this.query()
              }
          })
      },
      updateData(id) {
          this.form.userId = id
          this.dialogVisible = true
      },
      searchPage() {
        this.search.pageNumber = 1
        this.query()
      },
      query() {
        getCarSeekPage(this.search).then(res => {
          if(res.code == 1000) {
            this.tableData = res.data.records
            this.total = res.data.total
            this.loading = false
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
        })
      },
      refresh() {
        this.search.userId = ""
        this.search.createBy = ""
        this.query()
      },
      handleCurrentChange(val) {
        this.search.pageNumber = val
        this.query()
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.query()
      },
      handleSelectionChange(val) {
        this.update = []
        this.remove = []
        for (let i = 0;i < val.length;i++) {
          var item = val[i]
          this.update.push(item.id)
          this.remove.push(item.id)
        }
      },
      deleteDataBtn() {
        this.$confirm('确定删除选中的'+ this.remove.length +'条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDate(this.remove.join(","))
        }).catch(() => {
                 
        });
      },
      deleteDate(ids) {
        removeCarSeek({ids:ids}).then(res => {
            if(res.code == 1000) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.query()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              });
            }
          })
      },
    },
    mounted() {
      this.query()
    }
 }
</script>
<style lang=scss scoped>
  .search-table {
      width: 100%;
  }
  .search {
      background: #ffffff;
      border-radius: 7px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
  }
  .table {
      background: #ffffff;
      border-radius: 7px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      margin-top: 10px
  }
  .el-col {
      display: flex;
      flex-direction: row;
      align-items: center;
  }
  .search-title {
      font-family: '黑体';
      float: right;
      white-space: nowrap;
      font-size: 14px;
      margin-top:10px;
      width: 63px;
      text-align: right;
  }
  .el-table {
      padding: 10px;
  }
  .el-dialog__header {
    border-bottom: 1px solid #F4F8F9 !important;
  }
  .el-dialog {
    border-radius: 10px!important;
  }
</style>