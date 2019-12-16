<template>
  <div class="create">
    <div class="back">
      <router-link class="back-home" to="/">回到首页</router-link>
      <el-button type="info" round @click="publish('form')">发布文章</el-button>
    </div>
    <el-form :inline="true" :model="form" :rules="rules" ref="form" class="form-inline">
        <el-form-item label="分类列表" prop="classifyId">
            <el-select v-model="form.classifyId" placeholder="请选择分类">
              <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
    </el-form>
    <div>
      <mavon-editor 
        v-model="mdContent" 
        ref="md" 
        @change="change" 
        @imgAdd="imgAdd"
        @save="save"
        style="min-height: 600px"
        />
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import api from "@/api/api"

export default {
  name: 'create',
  components: {
      mavonEditor,
  },
  data() {
    return {
        mdContent: '',
        classify:[],
        form: {
          id: '',
          title: '',
          content: '', // 转换后的内容
          synopsis: '',   // 输入的markdown 内容 
          classifyId: '',
          music:{}
        },
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur' },{max: 50, message: '长度请勿超过50个字符', trigger: 'blur'}],
          content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
          classifyId: [{ required: true, message: '请选择分类', trigger: 'change' }]
        }
    }
  },
  methods: {
    change(value, render){
        this.form.content = render;
    },
    imgAdd(filename, imgfile){
      let formdata = new FormData();
          formdata.append('file', imgfile);
      api.upload(formdata,'/img').then(response => {
        mavonEditor.$img2Url(filename, response.data);
      })
    },
    save(value,render){
      this.$refs['form'].validate((valid) => {
        if (valid) {
            if(value.length>200){
              this.form.synopsis = value.substring(0,200)+"...";
            }else[
              this.form.synopsis = value
            ]
            this.form.content = render;
            api.create(this.form).then(response => {
              this.form.id = response.data
              this.$message({
                type: 'success',
                message: '保存成功'
              });
            })
        } else {
          return false;
        }
      });
    },
    publish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            if(this.mdContent.length>200){
              this.form.synopsis = this.mdContent.substring(0,200)+"...";
            }else{
              this.form.synopsis = this.mdContent;
            }
            api.altessay(this.form).then(() => {
              this.$message({
              type: 'success',
              message: '发布成功',
              onClose: this.$router.push('/')
            });
          })
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    api.classify().then(response => {
      this.classify = response.data;
    })
  }
}
</script>

<style scoped>
.back {
    display: flex;
    justify-content: space-between;
    padding: 30px 10% 5px 18px;
    text-align: center
}
.back-home {
    display: block;
    font-size: 15px;
    padding: 9px 15px;
    border: 1px solid rgba(36,114,89,.8);
    border-radius: 20px;
}
.form-inline {
  margin: 15px;
}
</style>>