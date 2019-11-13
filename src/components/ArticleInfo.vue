<template>
  <div>
    <el-drawer title="文章信息" size='75%' :visible.sync="infoVisible" @open="handleOpen" :wrnewserClosable="false"
      :before-close="handleClose">
      <div style="overflow-y: auto;overflow-x: hidden;width: 94%;margin: auto;">
        <el-form ref="postForm" :model="info" class="form-container">
          <div class="edit-container">
            <el-row :gutter="30">
              <el-col :span="15">
                <el-form-item style="margin-bottom: 20px;" prop="name">
                  <MDinput v-model="info.name" :maxlength="100" name="name" required>
                    文章名称
                  </MDinput>
                </el-form-item>
                <div style="font-size: 17px;font-weight: 600;margin-bottom: 10px;">文章描述：</div>
                <el-form-item prop="content">
                  <Tinymce ref="editor" v-if="freshEditor" v-model="info.content" :height="480" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-card class="box-card" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span>文章设置</span>
                  </div>
                  <el-form-item label="分类：" prop="category">
                    <el-cascader v-model="info.category" :options="cateOptions" placeholder="请选择分类" class="full-width"
                      style="width: 230px;" />
                  </el-form-item>
                  <el-form-item label="封面图：" prop="thumb">
                    <el-upload class="avatar-uploader" v-model="info.thumb" :action="uploadUrl" :show-file-list="false"
                      :on-success="handleUploadSuccess" :before-upload="beforeUpload">
                      <img v-if="info.thumb" :src="info.thumb" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="seo标题：" prop="seo_title">
                    <el-input v-model="info.seo_title" placeholder="seo标题" style="width: 230px;" />
                  </el-form-item>
                  <el-form-item label="seo关键词：" prop="seo_keywords">
                    <el-input v-model="info.seo_keywords" placeholder="seo关键词" style="width: 230px;" />
                  </el-form-item>
                  <el-form-item label="seo描述：" prop="seo_describe">
                    <el-input v-model="info.seo_describe" placeholder="seo描述" style="width: 230px;" />
                  </el-form-item>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="margin-bottom: 20px;">
              <el-col :sm="24" class="button-group">
                <el-button v-waves size="small" type="primary" icon="el-icon-check" @click="handleEdit">
                  保存
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import MDinput from '@/components/MDinput'
  import Tinymce from '@/components/Tinymce'
  import {
    categoryOptions
  } from '@/api/article_category'
  import {
    edit,
    create
  } from '@/api/article'

  export default {
    name: 'ArticleInfo',
    components: {
      MDinput,
      Tinymce
    },
    directives: {
      waves
    },
    props: [
      'infoVisible', 'articleInfo'
    ],
    data() {
      return {
        info: {
          id: 0,
          name: '',
          content: ''
        },
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        previewVisible: false,
        previewImageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        freshEditor: false,
        loading: false,
        loaded: false,
        cateOptions: [],
        isOnline: 0
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleUploadSuccess(res) {
        this.info.thumb = res.data.preview_url
      },
      handleUploadCodeSuccess(res) {
        this.info.code = res.data.preview_url
      },
      beforeUpload() {

      },
      handlePreview(url) {
        this.previewImageUrl = url
        this.previewVisible = true
      },
      getCateOptions() {
        categoryOptions().then(response => {
          console.log(response.data)
          this.cateOptions = response.data.options
        })
      },
      handleClose() {
        this.freshEditor = false
        this.$emit('update:infoVisible', false)
      },
      handleOpen() {
        this.getCateOptions()
        this.info = this.articleInfo
        this.freshEditor = true
      },
      handleEdit() {
        // this.info.content = this.$refs.editor.value
        if (this.info.id > 0) {
          edit(
            this.info
          ).then(response => {
            this.$emit('updateList')
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.handleClose()
          })
        } else {
          create(
            this.info
          ).then(response => {
            this.$emit('updateList')
            this.$notify({
              title: '成功',
              message: '发布成功',
              type: 'success',
              duration: 2000
            })
            this.handleClose()
          })
        }
      },
      handleUploaded(thumb) {
        this.info.thumb = thumb
      }
    }
  }
</script>

<style>
  .el-drawer__header {
    margin-bottom: 10px;
  }

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
