<template>
  <div class="index my-container">
    <span>这是精选页面</span>
    <div class="player">
          <aplayer autoplay
  :music="{
    title: 'secret base~君がくれたもの~',
    artist: 'Silent Siren',
    src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
  }"
  :mini="true"
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