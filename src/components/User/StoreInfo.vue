<template>
  <div>
    <el-drawer title="店铺信息" size="65%" :visible.sync="infoVisible" :before-close="handleClose" @open="handleOpen">
      <el-card class="box-card user-wrapper">
        <div>
          <el-card class="box-card mb-30" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">基本信息</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">店铺编号：</span>{{ info.id }}</el-col>
              <el-col :sm="8"><span class="info-label">手机号码：</span>{{ info.mobile }}</el-col>
              <el-col :sm="8"><span class="info-label">店铺名称：</span>{{ info.name }}</el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">注册时间：</span>{{ info.created_at }}</el-col>
              <el-col :sm="8"><span class="info-label">行业：</span>{{ info.category_name }}</el-col>
              <el-col :sm="8"><span class="info-label">地区：</span>{{ info.area_name }} {{info.address}}</el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">交易总额：</span>{{ info.money_total }}</el-col>
              <el-col :sm="8"><span class="info-label">评分：</span>{{ info.rate }}</el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">账户金额：</span>{{ info.money }}</el-col>
              <el-col :sm="8"><span class="info-label">提现待审核金额：</span>{{ info.money_block }}</el-col>
            </el-row>
          </el-card>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
  import {
    getInfo
  } from '@/api/store'
  export default {
    name: 'UserInfo',
    props: [
      'infoVisible', 'storeId'
    ],
    data() {
      return {
        info: {}
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:infoVisible', false)
      },
      handleOpen() {
        this.getInfo()
      },
      getInfo() {
        getInfo({
          id: this.storeId
        }).then(response => {
          this.info = response.data
        })
      }
    }
  }
</script>

<style>
  .user-wrapper {
    width: 94%;
    margin: auto;
    font-size: 15px;
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

  .info-col {
    margin-bottom: 20px;
  }
</style>
