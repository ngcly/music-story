<template>
  <div id="app">
    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<style>
html,body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  padding-top: 56px;
  background: #fff;
}
</style>
