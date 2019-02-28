<template>
  <div class="home">
     <el-row>
       <el-col :span="24">
         <div>
           <Scroller :lists="notice" class="scrollerContainer left"/>
         </div>
       </el-col>
     </el-row>
  
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          左侧待填充
        </div>
      </el-col>
      <el-col :span="8">
        <div class="block">
        <el-carousel height="250px">
          <el-carousel-item v-for="item in carousel" :key="item.id">
            <a target="_blank" :href="item.forwardUrl"><img :src="item.imageUrl" class="imgCarousel"></a>
          </el-carousel-item>
        </el-carousel>
      </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          右侧待填充
        </div>
      </el-col>
     </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Scroller from '@/components/Scroller.vue'
import api from '@/api/global'
export default {
  name: 'home',
  components: {
    Scroller
  },
  data(){
    return {
      carousel: [{}],
      notice: [],
      essays:[]
    }
  },
  mounted(){
    api.carousel().then(response => {
      this.carousel = response.data;
    }),
    api.notice().then(response => {
      for (var i=0; i<response.data.length;i++)
      this.notice.push(response.data[i].content);
    }),
    api.essays("","/10/1").then(response => {
      this.essays = response.data;
    })
  }
}
</script>

<style>
.home {
  text-align: center;
  color: #2c3e50;
  padding: 30px 100px 0px;
}
.scrollContainer {
   color: #ffffff;
   font-size: 16px;
   margin-left: 10px;
   width:79%;
   height: 30px;
   line-height: 30px;
   overflow: hidden;
 }

 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .imgCarousel{
    width: 100%
  }

</style>