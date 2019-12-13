<template>
  <div class="create">
    <router-link class="active" to="/">回到首页</router-link>
    <el-form :model="form" label-width="80px">
        <el-form-item label="分类列表">
            <el-select v-model="form.classifyId" placeholder="请选择分类">
              <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
    </el-form>
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
      api.create({title:this.form.title,classifyId:this.form.classifyId,synopsis:value.substring(0,200),content:render}).then(() => {
        this.$message.success({message:"保存成功"});
      })
      window.console.log(value,render)
    }
  },
  mounted() {
    api.classify().then(response => {
      this.classify = response.data;
    })
  }
}
</script>