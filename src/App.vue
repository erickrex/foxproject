<template>
  <Navbar />
  <router-view  />

</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar }
};
</script>

<style>
#app {
  
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
