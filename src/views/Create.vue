<template>
  <div class="create">
    <div class="back">
      <router-link class="back-home" to="/">回到首页</router-link>
    </div>
    <el-form :inline="true" :model="form" class="form-inline">
        <el-form-item label="分类列表">
            <el-select v-model="form.classifyId" placeholder="请选择分类">
              <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
    </el-form>
    <div>
      <mavon-editor 
        v-model="content" 
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
        content:'', // 输入的markdown
        html:'',    // 及时转的html
        classify:[],
        form: {
          title:'',
          classifyId:'',
          music:{}
        }
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render){
        // render 为 markdown 解析后的结果[html]
        this.html = render;
    },
    imgAdd(filename, imgfile){
      let formdata = new FormData();
          formdata.append('file', imgfile);
      api.upload(formdata,'/img').then(response => {
        mavonEditor.$img2Url(filename, response.data);
      })
    },
    save(value,render){
      let dsc;
      if(value.length>200){
        dsc = value.substring(0,200)+"...";
      }else{
        dsc = value;
      }
      api.create({title:this.form.title,classifyId:this.form.classifyId,synopsis:dsc,content:render}).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功',
          onClose: this.$router.push('/')
        });
      })
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
    width: 10%;
    padding: 30px 18px 5px;
    text-align: center
}
.back-home {
    display: block;
    font-size: 15px;
    padding: 9px 0;
    border: 1px solid rgba(36,114,89,.8);
    border-radius: 20px;
}
.form-inline {
  margin: 15px;
}
</style>>