<template>
  <div>
    <el-drawer title="用户详细信息" size="65%" :visible.sync="infoVisible" :before-close="handleClose" @open="handleOpen">
      <el-card class="box-card user-wrapper">
        <div>
          <el-card class="box-card mb-30" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">基本信息</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">用户编号：</span>{{ info.id }}</el-col>
              <el-col :sm="8"><span class="info-label">手机号码：</span>{{ info.mobile }}</el-col>
              <el-col :sm="8"><span class="info-label">昵称：</span>{{ info.nickname }}</el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">注册时间：{{ info.created_at }}</span></el-col>
              <el-col :sm="8"><span class="info-label">最近活跃时间：{{ info.updated_at }}</span></el-col>
              <el-col :sm="8"><span class="info-label">账户余额：{{ info.remain_money }}</span></el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">是否是推手：{{ info.is_pusher == 1 ? '是' : '不是' }}</span></el-col>
              <el-col :sm="8"><span class="info-label">推手账户余额：{{ info.money }}</span></el-col>
              <el-col :sm="8"><span class="info-label">推手账户冻结余额：{{ info.money_block }}</span></el-col>
            </el-row>
          </el-card>
        </div>
      </el-card>
      <el-card class="box-card user-wrapper" style="margin-top: 20px;">
        <div>
          <el-card class="box-card mb-30" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">团队成员</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-table :data="info.childs" style="width: 100%">
                <el-table-column prop="mobile" label="手机号" width="180">
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" width="180">
                </el-table-column>
                <el-table-column prop="pusher_at" label="成为推手时间">
                </el-table-column>
              </el-table>
            </el-row>
          </el-card>
        </div>
      </el-card>

      <el-card class="box-card user-wrapper" style="margin-top: 20px;">
        <div>
          <el-card class="box-card mb-30" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">推广收益记录</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-table :data="info.logs" style="width: 100%">
                <el-table-column prop="product_name" label="商品名称" width="180">
                </el-table-column>
                <el-table-column prop="retail" label="收益金额" width="180">
                </el-table-column>
                <el-table-column prop="level_name" label="收益类型" width="180">
                </el-table-column>
                <el-table-column prop="created_at" label="收益时间">
                </el-table-column>
              </el-table>
            </el-row>
          </el-card>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
  import {
    getInfo,
    loginCalculate,
    validateInfo,
    storeInfo,
    serviceList,
    publishTask,
    joinTask,
    casesList
  } from '@/api/member'
  export default {
    name: 'UserInfo',
    props: [
      'infoVisible', 'userId'
    ],
    data() {
      return {
        info: {},
        login_calculate: {},
        validate: {
          'person': {},
          'company': {}
        },
        store: {},
        serviceList: [],
        activeName: '1',
        publishTask: [],
        joinTask: [],
        casesList: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:infoVisible', false)
      },
      handleOpen() {
        this.getInfo()
        this.loginCalculate()
      },
      getInfo() {
        getInfo({
          id: this.userId
        }).then(response => {
          this.info = response.data
        })
      },
      handleTabClick(tab) {
        if (tab.name === '2') {
          this.validateInfo()
        }
        if (tab.name === '3') {
          this.storeInfo()
          this.getServiceList()
        }
        if (tab.name === '4') {
          this.getPublishTask()
        }
        if (tab.name === '5') {
          this.getJoinTask()
        }
        if (tab.name === '7') {
          this.getCasesList()
        }
      },
      getCasesList() {
        casesList({
          id: this.userId
        }).then(response => {
          this.casesList = response.data
        })
      },
      getPublishTask() {
        publishTask({
          id: this.userId
        }).then(response => {
          this.publishTask = response.data
        })
      },
      getJoinTask() {
        joinTask({
          id: this.userId
        }).then(response => {
          this.joinTask = response.data
        })
      },
      getServiceList() {
        serviceList({
          id: this.userId
        }).then(response => {
          this.serviceList = response.data
        })
      },
      storeInfo() {
        storeInfo({
          id: this.userId
        }).then(response => {
          this.store = response.data
        })
      },
      validateInfo() {
        validateInfo({
          id: this.userId
        }).then(response => {
          this.validate = response.data
        })
      },
      loginCalculate() {
        loginCalculate({
          id: this.userId
        }).then(response => {
          this.login_calculate = response.data
        })
      }
    }
  }
</script>

<style>
  .user-wrapper {
    width: 94%;
    margin: auto;
  }

  .id-card-image {
    height: 160px;
  }

  .licence-image {
    height: 240px;
  }

  .service-table-expand {
    font-size: 0;
  }

  .service-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .service-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-drawer__body {
    overflow-y: scroll;
  }
</style>
