<template>
  <div>
    <div id="nav">
      <navbar />
    </div>
    <transition>
      <router-view/>
    </transition>
   </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'layout',
  components: {
    Navbar
  }
}
</script>