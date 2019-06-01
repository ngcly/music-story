<template>
  <div class="index my-container">
     <vue-particles
        color="#3385FF"
        linesColor="#3385FF"
      ></vue-particles>
    <!--logo-->
    <div class="logo">
      <router-link to="/">
        <img src="../assets/img/logo.png">
      </router-link>
    </div>
    <!-- <router-link to="/">
    <div id="lo"></div>
    </router-link> -->
    <div class="main">
      <div class="typer" style="width:280px;">
      <span v-for="(item, index) in str" :key="index" v-bind:style="{animationDelay: `${0.5 + index * 0.3}s`}" v-html="item"></span>
    </div>
    </div>

    <aplayer 
    :audio="audio" 
    :lrcType="3" 
    :autoplay="true"
    fixed />
  </div>
</template>

<script>
import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';
import VueParticles from 'vue-particles';

Vue.use(VueParticles);
Vue.use(APlayer);
export default {
  name: 'index',
  data() {
 return {
      audio: [
        {
          name: 'where are you',
          artist: 'AniFace',
          url: 'http://music.163.com/song/media/outer/url?id=453843751.mp3',
          cover: 'http://p1.music.126.net/AUfXMljLBgB3PBV731IzRg==/109951162857118370.jpg',
          // lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
        },
        {
          name: '碎月雨中奏',
          artist: 'iw ix',
          url: 'http://music.163.com/song/media/outer/url?id=103035.mp3',
          cover: 'http://p2.music.126.net/wl-EL0LwqSkjWWlhphoxOQ==/51677046517786.jpg',
          // lrc: 'https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc',
        },
      ],
      str:"春宫閟此青苔色，秋帐含此明月光，夏簟清兮昼不暮，冬釭凝兮夜何长！织锦曲兮泣已尽，回文诗兮影独伤，春草暮兮秋风惊，秋风罢兮春草生。绮罗毕兮池馆尽，琴瑟灭兮丘垄平。",
    };
  },
}
</script>

<style scoped>
.logo{
    position:absolute;
    top: 32px;
    left: 32px;
    border-radius:80px;     /*圆角*/
    transition: all 1.0s;
}
.logo img{
    width: 80px;
}
.logo:hover{     
  transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  /* IE 9 */
  -moz-transform: rotate(360deg);
  /* Firefox */
  -webkit-transform: rotate(360deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(360deg);
  /* Opera */
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);    
}
@keyframes run{     
  from{     
      -webkit-transform:rotate(360deg);     
    }     
   to{     
      -webkit-transform:rotate(0deg);     
    }     
  }
  /* 360-0 向左旋转 0-360 向右旋转 */

.main{
  text-align: center;
  font-weight: bold;
  font-size: 30px; 
  display: flex;
  flex-direction: row;
  letter-spacing: 4px
}
#particles-js{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:cornsilk
}
.typer span {
  animation: flip-in 1s 0s ease-in-out both;
}
@keyframes flip-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>