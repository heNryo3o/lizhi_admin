<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.name" size="small" prefix-icon="el-icon-search" placeholder="输入资讯名称搜索" clearable
          @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="状态" size="small" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="small" unlink-panels
          range-separator="-" start-placeholder="发布开始日期" end-placeholder="发布结束日期" value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日"
          style="width: 100%;" />
      </el-col>
      <el-col :sm="8">
        <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves type="success" size="small" @click="handleCreate">
          添加资讯
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="资讯名称" width="210">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewnews(row)">{{ row.name }}</span>
            <el-tag size="mini" type="danger" v-if="row.is_recommen == 1">推荐</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="分类" width="150">
          <template slot-scope="{row}">
            <span>{{ row.category_name }}</span>
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
            <el-button v-waves type="primary" size="mini" @click="handleViewnews(row)">
              编辑
            </el-button>
            <el-button v-if="row.status == 1" v-waves size="mini" type="warning" @click="handleChangeStatus(row,2)">
              下架
            </el-button>
            <el-button v-else v-waves size="mini" type="success" @click="handleChangeStatus(row,1)">
              上架
            </el-button>
            <el-button v-if="row.is_recommen == 1" v-waves size="mini" type="warning" @click="handleChangeRecommen(row,2)">
              取消推荐
            </el-button>
            <el-button v-else v-waves size="mini" type="success" @click="handleChangeRecommen(row,1)">
              设为推荐
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <news-info :news-info="newsInfo" :info-visible.sync="newsVisible" @updateList="getList()" />

  </div>
</template>

<script>
  import {
    getList,
    changeStatus,
    setRecommen
  } from '@/api/news'
  import waves from '@/directive/waves'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import NewsInfo from '@/components/NewsInfo'

  export default {
    components: {
      Pagination,
      NewsInfo
    },
    directives: {
      waves
    },
    data() {
      return {
        newsInfo: {},
        newsVisible: false,
        statusOptions: [{
            name: '上架中',
            key: 1
          },
          {
            name: '已下架',
            key: 2
          }
        ],
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
    },
    methods: {
      handleChangeRecommen(row, status) {
        var message = status === 1 ? '设置推荐成功' : '取消推荐成功'
        setRecommen({
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
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleCreate() {
        this.newsInfo = {}
        this.newsVisible = true
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleViewnews(row) {
        this.newsInfo = row
        this.newsVisible = true
      },
      handleChangeStatus(row, status) {
        var message = status === 1 ? '资讯上架成功' : '资讯下架成功'
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

</style>
