<template>
  <main class="container">
    <Header/>
    <div class="content">
        this is content
    </div>
    <Footer/>
  </main>
</template>

<script>
import Header from './components/Head.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'root',
  components: {
    Header,
    Footer,
  }
}
</script>
