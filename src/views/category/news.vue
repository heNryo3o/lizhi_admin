<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="13">
        <el-button v-waves type="success" icon="el-icon-search" size="small" @click="handleCreate">
          添加分类
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="名称" width="150">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类等级" width="120">
          <template slot-scope="{row}">
            <span>{{ row.level }}级</span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 1 ? '' : 'danger'" size="small"><span>{{ row.status == 1 ? '使用中' : '已禁用' }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves type="primary" size="mini" @click="handleUpdate(row)">
              修改
            </el-button>
            <el-button
              v-if="row.status == 1"
              v-waves
              size="mini"
              type="warning"
              @click="handleChangeStatus(row,2)"
            >
              禁用
            </el-button>
            <el-button v-else v-waves size="mini" type="success" @click="handleChangeStatus(row,1)">
              启用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 新增/编辑用户信息弹框 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 550px; margin-left:50px;">

        <el-form-item label="分类名称">
          <el-input v-model="temp.name" placeholder="请填写分类名称" />
        </el-form-item>

        <el-form-item label="父级分类">
          <div class="block">
            <el-cascader v-model="temp.parent_id" :options="parentOptions" :props="{ checkStrictly: true }" clearable />
          </div>
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="medium">启用</el-radio>
            <el-radio v-model="temp.status" label="2" border size="medium">禁用</el-radio>
          </div>
        </el-form-item>

        <el-form-item label="seo标题">
          <el-input v-model="temp.seo_title" placeholder="请填写seo标题" />
        </el-form-item>

        <el-form-item label="seo关键词">
          <el-input v-model="temp.seo_keywords" placeholder="请填写seo关键词" />
        </el-form-item>

        <el-form-item label="seo描述">
          <el-input v-model="temp.seo_describe" placeholder="请填写seo描述" />
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

  </div>
</template>

<script>
import {
  getList,
  edit,
  create,
  changeStatus,
  getParentOptions
} from '@/api/news_category'
import waves from '@/directive/waves' // waves directive
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
      parentOptions: [],
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改分类信息',
        create: '新增分类'
      },
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '-id'
      }
    }
  },
  created() {
    this.getList()
    this.getParentOptions()
  },

  methods: {
    getParentOptions() {
      getParentOptions().then(response => {
        this.parentOptions = response.data.options
      })
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
      var message = status === 1 ? '分类启用成功' : '分类禁用成功'
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
    },

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {

      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
              this.getParentOptions()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改分类信息成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            create(this.temp).then(response => {
              this.getList()
              this.getParentOptions()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '新建分类成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        }
      })
    },
    resetTemp() {
      this.temp = {
        id: 0,
        status: '1'
      }
    }
  }
}
</script>

<style lang="scss">
  .el-form-item__content{
    text-align: left;
  }
</style>
