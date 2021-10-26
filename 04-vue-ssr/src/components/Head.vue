<template>
  <Header>
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <button @click="handleClick">click me</button>
      </ul>
    </nav>
  </Header>
</template>
<script>
export default {
  methods: {
    handleClick(){
      alert('click me')
    }
  }
}
</script>

<style scoped>
  Header {
    color: red;
  }
</style>