<template>
  <div>
    <router-view></router-view>
      <span v-if="ishidden">
        <bottomNav />
      </span>
  </div>
</template>

<script setup>
import bottomNav from './components/bottomNav.vue'
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRoute()
const ishidden = ref(false)

watch(() => router.name,() => {
  if(router.name != 'landingPage') ishidden.value = true
})
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

  *{
    font-family: 'Poppins', sans-serif;
  }
</style>
