<template>
  <div class="index my-container">
    <span>这是精选页面</span>
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
    };
  },
}
</script>