<template>
  <div id="app">
    <div>
      <div id="nav">
        <MyHeader />
      </div>
      <transition>
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from '@/components/MyHeader.vue'
export default {
  name: 'myHeader',
  components: {
    MyHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  padding-top: 56px;
  background: #fff;
}
</style>
