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

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    height: 90px;
    margin: 0 auto;
    padding: 5px;
  }
  header h1 {
    color: #dfdfdf;
    font-size: 2rem;
  }
  header a {
    color: #bbb;
    text-decoration: none;
    margin-left: 20px;
  }
  header a.router-link-active {
    color: #444;
    font-weight: bold;
  }
</style>