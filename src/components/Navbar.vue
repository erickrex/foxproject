<template>
  <header>
    <h1>Product selector MVP</h1>
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link>
     
    </nav>
  </header>
</template>

<script>
export default {
}
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    height: 80px;
    margin: 0 auto;
  }
  h1 {
    color: #dfdfdf;
    font-size: 2rem;
    text-decoration: none;

  }
  h1:hover {
    color: black;
  }
  nav {
    text-decoration: none;
    color: #dfdfdf;
    font-size: 2rem;
  }
  nav:hover{
    color: black;
  }
</style>