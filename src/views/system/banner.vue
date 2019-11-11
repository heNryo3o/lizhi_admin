<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="5">
        <el-button v-waves type="primary" size="small" @click="handleCreate">
          添加banner
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="banner名称" width="210">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="160">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 1 ? '' : 'danger'" size="small"><span>{{ row.status == 1 ? '上架中' : '已下架' }}</span></el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="260" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button v-if="row.status == 1" v-waves size="mini" type="warning" @click="handleChangeStatus(row,2)">
              禁用
            </el-button>
            <el-button v-else v-waves size="mini" type="success" @click="handleChangeStatus(row,1)">
              启用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="编辑banner" width="700px" :visible.sync="dialogFormVisible">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 550px; margin-left:50px;">

        <el-form-item label="banner名称">
          <el-input v-model="temp.name" placeholder="请填写banner名称" />
        </el-form-item>
        <el-form-item label="banner图">
          <el-upload class="avatar-uploader" v-model="temp.thumb" :action="uploadUrl" :show-file-list="false"
            :on-success="handleUploadSuccess" :before-upload="beforeUpload">
            <img v-if="temp.thumb" :src="temp.thumb" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="temp.url" placeholder="请填写url" />
        </el-form-item>
        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="medium">启用</el-radio>
            <el-radio v-model="temp.status" label="2" border size="medium">禁用</el-radio>
          </div>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
  import {
    getList,
    changeStatus,
    edit,
    create
  } from '@/api/banner'
  import waves from '@/directive/waves'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    components: {
      Pagination
    },
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id'
        },
        dialogFormVisible: false,
        temp: {},
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleUploadSuccess(res) {
        this.temp.thumb = res.data.preview_url
      },
      beforeUpload() {

      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {

        })
      },

      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.status = this.temp.status === 1 ? '1' : '2'
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {

        })
      },

      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.temp.id > 0) {
              edit(this.temp).then(response => {
                this.getList()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '修改banner信息成功',
                  type: 'success',
                  duration: 2000
                })
              })
            } else {
              create(this.temp).then(response => {
                this.getList()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '新建banner成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          }
        })
      },
      handlePreview(url) {
        this.previewImageUrl = url
        this.previewVisible = true
      },

      resetTemp() {
        this.temp = {
          id: 0,
          status: '1'
        }
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleChangeStatus(row, status) {
        var message = status === 1 ? 'banner启用成功' : 'banner禁用成功'
        changeStatus({
          id: row.id,
          status: status
        }).then(response => {
          this.$notify({
            title: '成功',
            message: message,
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }
    }
  }
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
