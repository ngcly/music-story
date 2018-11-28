<template>
  <div class="index my-container">
    <span>这是精选页面</span>
    <div class="player">
          <aplayer autoplay
  :music="{
    title: 'where are you',
    artist: 'AniFace',
    src: 'http://music.163.com/song/media/outer/url?id=453843751.mp3',
    pic: 'http://p1.music.126.net/AUfXMljLBgB3PBV731IzRg==/109951162857118370.jpg'
  }"
  :list="[{
    title: '碎月雨中奏',
    artist: 'iw ix',
    src: 'http://music.163.com/song/media/outer/url?id=103035.mp3',
    pic: 'http://p2.music.126.net/wl-EL0LwqSkjWWlhphoxOQ==/51677046517786.jpg'
  }]"
  :mini="false"
  :float="true"
/>
    </div>
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'

export default {
  name: 'index',
  components: {
    Aplayer
  }
}
</script>
<style scoped>
.player{
  position: relative;
  position: absolute;left: 0;bottom: 0;
}
</style>