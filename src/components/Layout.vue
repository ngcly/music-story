<template>
  <div id="body">
    <navbar />
    <transition>
      <router-view />
    </transition>
    <el-backtop target="#body" :right="300"></el-backtop>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "layout",
  components: {
    Navbar
  }
};
</script>
<style scoped>
#body {
  overflow-x: auto;
  height: 100%;
}
</style>