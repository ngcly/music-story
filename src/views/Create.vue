<template>
  <div class="create">
    <router-link class="active" to="/">回到首页</router-link>
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
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render){
        // render 为 markdown 解析后的结果[html]
        this.html = render;
    },
    imgAdd(filename, imgfile){
      var formdata = new FormData();
          formdata.append('file', imgfile);
      api.upload(formdata,'/img').then(response => {
        mavonEditor.$img2Url(filename, response.data);
      })
    },
    save(value,render){
      api.create(render).then(() => {
        this.$message.success({message:"保存成功"});
      })
      window.console.log(value,render)
    }
  },
  mounted() {}
}
</script>